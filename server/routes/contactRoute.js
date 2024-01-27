import express from "express";
import saveContactInfo from "../controllers/saveContactInfo.js";
const router = express.Router();
router.post("/", saveContactInfo);
export default router;