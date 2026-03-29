import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProductController } from "./product.controller";
import { ProductValidation } from "./product.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../Interface/types";
import { upload } from "../../utils/upload.utils";

const router = Router();

router.post(
  "/upload-image",
  auth(USER_ROLE.admin),
  upload.single("image"),
  ProductController.uploadProductImage,
);

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);

router.patch(
  "/reorder",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductPositionsValidationSchema),
  ProductController.updateProductPositions,
);

router.get("/", ProductController.getAllProducts);
router.get("/pinned", ProductController.getPinnedProducts);

router.get("/:id", ProductController.getSingleProduct);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);

router.patch(
  "/:id/pin",
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductPinValidationSchema),
  ProductController.updateProductPin,
);

router.delete("/:id", auth(USER_ROLE.admin), ProductController.deleteProduct);

export const ProductRouter = router;
