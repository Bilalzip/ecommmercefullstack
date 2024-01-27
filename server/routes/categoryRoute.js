import express from "express";
import handlecategory from "../controllers/handlecategory.js";
import { CategoryModel } from "../models/categorymodel.js";
import CategoryWiseProducts from "../controllers/CategoryWiseProducts.js";
const router = express.Router();

router.post("/addcategory",handlecategory)
router.get("/addcategory" , async(req,res)=>{
  try {
    const category = await CategoryModel.find({});
    console.log(category)
   res.json(category)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
})

router.post('/delete', async (req, res) => {

    const { category } = req.body;
    const del = await CategoryModel.deleteOne({ category });
  });

  router.post('/edit' , async (req,res)=>{
    
  });

  router.get('/:category', CategoryWiseProducts)



  

export default router
