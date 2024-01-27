import express from "express";
import placeorder from "../controllers/placeorder.js";
import formidable from "express-formidable";
import Orders from "../controllers/Orders.js";
import OrderStatus from "../controllers/OrderStatus.js";
import OrderModel from "../models/Order.js";
const router = express.Router();
router.post("/placeorder",formidable(), placeorder);
router.post("/", Orders);
router.post("/status", OrderStatus);
router.post("/remove" , async (req, res) => {
    const {id} = req.body;
    const remove = await OrderModel.findByIdAndDelete(id);
    res.json({
        message: "Order deleted successfully"
    })
})
  
export default router;