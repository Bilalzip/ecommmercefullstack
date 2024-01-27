import OrderModel from "../models/Order.js";

export const OrderStatus = async (req, res) => {
  try {
    const { orderStatus, id } = req.body;
    console.log(id)
    console.log(orderStatus);
    const order = await OrderModel.findByIdAndUpdate({ _id: id }, { orderStatus: orderStatus });
    console.log(order)  // Fix the field name here
    res.json({
      message: "Order Status has been updated",
      order
    });
  } catch (error) {
    res.json({ error: error.message });
    console.log(error.message);
  }
}

// Use export default only once
export default OrderStatus;
