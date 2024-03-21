import express from "express";
import { statsController } from "../controllers/statsController.js";
const router = express.Router();
router.post('/' , statsController)
export default router;