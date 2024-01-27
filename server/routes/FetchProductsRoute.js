import express from "express";
import FetchProducts from "../controllers/FetchProducts.js";
import ProductModel from "../models/productmodel.js";
import CategoryWiseProducts from "../controllers/CategoryWiseProducts.js";
const router = express.Router();
router.post("/", FetchProducts)
router.get('/:id', async (req,res)=>{
const {id} = req.params;
const product = await ProductModel.findById({_id: id}).select("photos");

  if (product.photos.data) {
    // Set the content type based on the photo data's contentType
    res.set("Content-type", product.photos.data.contentType);
    // Send the image data directly
    return res.status(200).send(product.photos.data);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
export default router
