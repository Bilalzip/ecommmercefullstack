import OrderModel from "../models/Order.js";
import ProductModel from "../models/productmodel.js";
import UserModel from "../models/userModel.js";

const Orders = async (req, res) => {
  try {
    const { data } = req.body;
    const user = await UserModel.findOne({ username: data });
    if (!user) {
      res.json({
        error: "Please login Again"
      });
      return;
    }
    const orders = user.orders;
    let OrderData = [];
    for (let id of orders){
      console.log(id);
      const fetchOrder = await OrderModel.findById(id);
      OrderData.push(fetchOrder); 
    }
    console.log(OrderData)
      res.json(OrderData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default Orders;
