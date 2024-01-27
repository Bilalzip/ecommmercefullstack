import ProductModel from "../models/productmodel.js";

export const FetchProducts = async (req, res) => {
  const userSearch = req.body.Product;
try {
  const searchResult = await ProductModel.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: userSearch,
          path: {
            wildcard: "*"
          }
        }
      }
    }
  ]);
  res.status(200).send(searchResult)
  console.log(searchResult)
} catch (error) {
  console.log(error)
}
};

export default FetchProducts;
