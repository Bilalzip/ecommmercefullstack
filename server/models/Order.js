import mongoose from "mongoose";
import { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({


  productsDetails: [
    {
      id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      photo:{
        type: String,
        required: true,
      }, 
      productName:{
        type: String,
        required: true,
      }, 
      slug:{
        type: String,
        required: true,
        default:"hii"
      }, 
      price:{
        type: Number,
        required: true,
      },
      total:{
        type:Number
      }
    },
  ],

  
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    ref: "UserModel",
  },
  paymentDetails:{
    paymentId: {
      type: String
    }, 
  },
  orderStatus: {
    type: String, 
    default: "placed" // Fix the typo in the field name
  },
  amount:{
    type: Number
  }
  });
  
  const OrderModel = mongoose.model('Orders', OrderSchema);
  
  export default OrderModel;
  