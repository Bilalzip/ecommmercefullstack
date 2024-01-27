import express from "express";
import CreatePaymentLink from "../controllers/CreatePaymentlink.js";
import updatePaymentInformations from "../controllers/updatePaymentInformation.js";
const router = express.Router();


router.post("/:id", CreatePaymentLink);
router.get("/" ,updatePaymentInformations);
export default router;