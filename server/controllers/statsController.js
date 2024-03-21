import ProductModel from "../models/productmodel.js";
import UserModel from "../models/userModel.js";

export const statsController = async( req, res)=>{
       const {userid} = req.body;
       try {
              const User = await UserModel.findById(userid);
              const users = (await UserModel.find({})).length;

              const Products = await (await ProductModel.find({})).length
              console.log(users)

              const Stats = [ 
                   {  totalOrders: User.orders.length,
                     totalProducts:Products,
                     totalUsers:users }
              ]

              res.json({
                     success: true,
                     Stats
              })
              
       } catch (error) {
              console.log(error.message);
       }
       
}