
const API_URL = 'http://localhost:5000/api/v1/page-content';

const pageContentData = [
  {
    pageKey: 'home',
    sections: [
      {
        sectionKey: 'hero',
        head: 'From Vision to <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Digital Reality</span>',
        caption: 'Engineering Your Success',
        description: "We build scalable, high-performance digital products that transform businesses. From startups to enterprises, we're your partner in innovation."
      },
      {
        sectionKey: 'services',
        head: 'Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]">Services</span>',
        caption: 'What We Do',
        description: 'Comprehensive digital solutions tailored to your business needs.'
      },
      {
        sectionKey: 'process',
        head: 'Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)]">Process</span>',
        caption: 'How We Work',
        description: 'A systematic approach to building extraordinary digital products.'
      },
      {
        sectionKey: 'portfolio',
        head: 'Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--vibrant-green)] to-[color:var(--bright-red)]">Works</span>',
        caption: 'Success Stories',
        description: 'Discover how we help our clients achieve their business goals.'
      },
      {
        sectionKey: 'blog',
        head: 'Latest <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Insights</span>',
        caption: 'Blog & News',
        description: 'Thoughts, trends, and tutorials from our expert team.'
      }
    ]
  },
  {
    pageKey: 'about',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Engineering the <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Future</span> of Digital Business',
        caption: 'About Phixels',
        description: "We are more than a software house. We are architects of digital transformation, dedicated to building products that matter."
      },
      {
        sectionKey: 'architects',
        head: 'The <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]">Architects</span> Behind Your Success',
        caption: 'Our Visionaries',
        description: 'A global team of designers, engineers, and strategists obsessed with excellence.'
      },
      {
        sectionKey: 'philosophy',
        head: 'Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)]">Core</span> Philosophy',
        caption: 'Values We Live By',
        description: 'Innovation is in our DNA. We combine technical expertise with a product-first mindset.'
      },
      {
        sectionKey: 'metrics',
        head: 'Our Impact in <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--vibrant-green)] to-[color:var(--bright-red)]">Numbers</span>',
        caption: 'Excellence Quantified',
        description: 'Delivering measurable results and scaling businesses globally.'
      },
      {
         sectionKey: 'clients',
         head: 'Trusted by <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]">Industry Leaders</span>',
         caption: 'Our Partners',
         description: 'Collaborating with visionary founders and established enterprises.'
      },
      {
        sectionKey: 'cta',
        head: 'Ready to build your <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">next big thing?</span>',
        description: "Join the top 1% of companies building the future with Phixels.",
        buttonText: "Let's Talk"
      }
    ]
  },
  {
    pageKey: 'services',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Services That <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Scale & Succeed</span>',
        caption: 'Our Services',
        description: "From mobile apps to AI solutions, we deliver cutting-edge technology services that transform businesses and drive growth."
      },
      {
        sectionKey: 'cta',
        head: 'Ready to Start Your Project?',
        description: "Let's discuss your requirements and build something extraordinary together.",
        buttonText: 'Get Free Consultation'
      }
    ]
  },
  {
    pageKey: 'products',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Digital Products That <br /> <span class="text-gradient">Scale & Succeed</span>',
        caption: 'Our Product Portfolio',
        description: "Innovative solutions built by our team, trusted by thousands of users worldwide. From concept to market leader."
      },
      {
        sectionKey: 'cta',
        head: 'Have a Product Idea?',
        description: "Let's build the next big thing together. Our team specializes in turning ideas into successful digital products.",
        buttonText: 'Start Your Project'
      }
    ]
  },
  {
    pageKey: 'career',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Join the Top 1% <br /> <span class="text-gradient">Engineering Team</span>',
        caption: 'We are hiring!',
        description: "We don't just hire employees. We hire future CTOs, founders, and visionaries. Build the future with us."
      }
    ]
  },
  {
    pageKey: 'portfolio',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Our Portfolio',
        description: "Showcasing our finest work across industries. From startups to Fortune 500 enterprises."
      }
    ]
  },
  {
    pageKey: 'works',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Case Studies',
        description: "Deep dives into how we solve complex problems and drive measurable business results."
      }
    ]
  },
  {
    pageKey: 'contact',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Get in <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Touch</span>',
        caption: "Let's Create Something Amazing",
        description: "Ready to transform your vision into reality? We're here to help you build something extraordinary. Let's start the conversation."
      }
    ]
  },
  {
    pageKey: 'blog',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Insights & <span class="text-gradient">Thoughts</span>',
        caption: 'Our Blog',
        description: "Deep dives into engineering, design, and the future of technology."
      }
    ]
  },
  {
    pageKey: 'privacy',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Privacy <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--vibrant-green)]">Policy</span>',
        caption: 'Your Privacy Matters',
        description: "At Phixels, your privacy is our priority. Learn how we collect, use, and protect your information."
      }
    ]
  },
  {
    pageKey: 'terms',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Terms & <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--neon-yellow)]">Conditions</span>',
        caption: 'Legal Agreement',
        description: "Welcome to Phixels! These terms outline the rules and regulations for using our services."
      }
    ]
  },
  {
    pageKey: 'sitemap',
    sections: [
      {
        sectionKey: 'hero',
        head: 'Explore <span class="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--bright-red)] via-[color:var(--neon-yellow)] to-[color:var(--vibrant-green)] animate-gradient bg-300%">Phixels</span>',
        caption: 'Site Navigation',
        description: "Your complete guide to navigating our website. Discover all our pages and services in one place."
      }
    ]
  },
  {
    pageKey: 'master-popup',
    sections: [
      {
        sectionKey: 'sidebar',
        head: 'Transforming Ideas Into Digital Empires',
        description: "Join hundreds of visionary founders who scaled their dreams with Phixels."
      },
      {
        sectionKey: 'form',
        head: "Let's Engineer Your Billion-Dollar Idea"
      }
    ]
  }
];

async function seed() {
  console.log('Starting content seeding...');
  
  for (const page of pageContentData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
      });
      
      const result = await response.json();
      if (result.success) {
        console.log(`Successfully seeded content for page: ${page.pageKey}`);
      } else {
        console.error(`Failed to seed content for page: ${page.pageKey}`, result.message);
      }
    } catch (error) {
      console.error(`Error seeding content for page: ${page.pageKey}`, error);
    }
  }
  
  console.log('Seeding completed!');
}

seed();
