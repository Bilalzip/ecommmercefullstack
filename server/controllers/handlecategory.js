import slugify from "slugify";
import { CategoryModel } from "../models/categorymodel.js";

export const handlecategory = async (req, res) => {
  const { category } = req.body;
  if (!category) {
    res.status(400).send({ "message": "Please enter a category" });
    return; // Exit the function early to avoid further processing
  }

  const match = await CategoryModel.find({category});
  if (match.length > 0) {
    res.status(200).send({
      "error": null,
      "message": "This category already exists"
    });
  } else {
    const save = await new CategoryModel({ category, slug: slugify(category) }).save();
    res.json("Category has been created")
  }
};
export default handlecategory;
