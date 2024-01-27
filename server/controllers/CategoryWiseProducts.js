import ProductModel from "../models/productmodel.js";

export const CategoryWiseProducts = async (req,res)=>{
    const { category } = req.params;
    console.log(category)

    try {
        const products = await ProductModel.find({category:category}).select("-photos");
        res.json({
            succcess:true,
            products
        })
    } catch (error) {
        
    }
}
export default CategoryWiseProducts;