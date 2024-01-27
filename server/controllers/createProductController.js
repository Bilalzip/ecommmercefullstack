import slugify from "slugify";
import ProductModel from "../models/productmodel.js";

export const createProductController = async (req, res) => {
  try {
    const {
      productName,
      price,
      color,
      category,
      discount,
      size,
      brand,
      stock,
      username,
      description,
      photo,
    } = req.body;

    console.log(photo);

    // Validate required fields
    if (!category || !username || !description || !productName || !price || !color || !discount || !size || !brand || !stock) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Create a new product instance
    const product = new ProductModel({
      productName,
      price,
      color,
      category,
      discount,
      size,
      brand,
      stock,
      username,
      description,
      photo,
      slug: slugify(productName),
    });

    // Save the product to the database
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
export default createProductController;