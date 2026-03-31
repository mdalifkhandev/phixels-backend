import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ContactRequestController } from "./contactRequest.controller";
import { ContactRequestValidation } from "./contactRequest.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ContactRequestValidation.createContactRequestValidationSchema),
  ContactRequestController.createContactRequest,
);

router.get("/", ContactRequestController.getAllContactRequests);

router.get("/:id", ContactRequestController.getSingleContactRequest);

router.patch(
  "/:id",
  validateRequest(ContactRequestValidation.updateContactRequestValidationSchema),
  ContactRequestController.updateContactRequest,
);

router.delete("/:id", ContactRequestController.deleteContactRequest);

export const ContactRequestRoutes = router;

