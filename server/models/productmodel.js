import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  description:{
    type:String
  },
  price: {
    type: String, 
  },
  color: {
    type: String, 
  },
  photos: {
    type: Buffer,
    contentType: String
  },
  size: {
    type: String,
  },
  discount: {
    type: String,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0, // Default stock value
  },
  photo: {
    type: String,
  }
  , slug:{
    type: String
  }, 
  category: {
    type: String,
    required: true
  },
  username:{
    type:String,
    ref: "UserModel"
  }
  });

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
