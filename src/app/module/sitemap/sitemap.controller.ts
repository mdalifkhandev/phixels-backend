import { Request, Response } from "express";
import { Blog } from "../blogs/blog.model";
import { ServiceCategoryModel, ServiceSubcategoryModel } from "../service/service.model";
import { ProductModel } from "../product/product.model";
import { CaseStudyModel } from "../caseStudy/caseStudy.model";
import { CareerModel } from "../career/career.model";

const BASE_URL = "https://phixels.agency";

const generateSitemap = async (req: Request, res: Response) => {
  try {
    const [blogs, categories, subcategories, products, caseStudies, careers] = await Promise.all([
      Blog.find({ status: "published" }).select("slug _id updatedAt"),
      ServiceCategoryModel.find({ isDeleted: false, isActive: true }).select("slug updatedAt"),
      ServiceSubcategoryModel.find({ isDeleted: false, isActive: true }).populate("categoryId").select("slug categoryId updatedAt"),
      ProductModel.find({ isDeleted: false, isActive: true }).select("_id updatedAt"),
      CaseStudyModel.find({ isActive: true }).select("_id updatedAt"),
      CareerModel.find({ isDeleted: false, isActive: true }).select("_id updatedAt"),
    ]);

    const staticPages = [
      "",
      "/about",
      "/contact",
      "/services",
      "/products",
      "/work",
      "/portfolio",
      "/case-studies",
      "/career",
      "/blog",
      "/privacy",
      "/terms",
      "/sitemap",
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Pages
    staticPages.forEach((page) => {
      xml += `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    });

    // Blogs
    blogs.forEach((blog) => {
      const id = blog.slug || blog._id;
      xml += `
  <url>
    <loc>${BASE_URL}/blog/${id}</loc>
    <lastmod>${(blog as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Service Categories
    categories.forEach((cat) => {
      xml += `
  <url>
    <loc>${BASE_URL}/services/${cat.slug}</loc>
    <lastmod>${(cat as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Service Subcategories (Detail pages)
    subcategories.forEach((sub) => {
      const categorySlug = (sub.categoryId as any)?.slug || "uncategorized";
      xml += `
  <url>
    <loc>${BASE_URL}/services/${categorySlug}/${sub.slug}</loc>
    <lastmod>${(sub as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Products
    products.forEach((prod) => {
      xml += `
  <url>
    <loc>${BASE_URL}/products/${prod._id}</loc>
    <lastmod>${(prod as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Case Studies
    caseStudies.forEach((cs) => {
      xml += `
  <url>
    <loc>${BASE_URL}/case-studies/${cs._id}</loc>
    <lastmod>${(cs as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });

    // Careers
    careers.forEach((job) => {
      xml += `
  <url>
    <loc>${BASE_URL}/career/${job._id}</loc>
    <lastmod>${(job as any).updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Error generating sitemap");
  }
};

export const SitemapController = {
  generateSitemap,
};
