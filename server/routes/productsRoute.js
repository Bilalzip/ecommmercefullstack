import express from "express";
import createProductController  from "../controllers/createProductController.js";
const router = express.Router();
import formidable from "express-formidable";
import ProductModel from "../models/productmodel.js";
router.post('/addproducts', createProductController);
router.get('/addproducts',async (req,res)=>{
    const getallproducts = await  ProductModel.find({}).select("-photos").limit(12).sort({createAt: -1})
    res.json(getallproducts);
})
  router.get("/addproducts/:slug", async (req,res)=>{
    const { slug } = req.params;
    try {
        const product = await ProductModel.findOne({ slug: slug });
        console.log(product)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  })
export default router;
