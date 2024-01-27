import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/auth";
import { Audio } from 'react-loader-spinner';
import { Link } from "react-router-dom";

const ProductForm = () => {
  const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dauwgr7yd"
  const [loading, setloading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const userObject = JSON.parse(auth.user);
  const username = userObject.username;

  const [formInput, setFormInput] = useState({
    productName: "",
    price: 0,
    color: "",
    discount: 0,
    size: "",
    brand: "",
    stock: 0,
    description: "",
  });

  const [photo, setPhoto] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const Cloudinary = async (data) => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      // Append the upload_preset to the FormData
      data.append('upload_preset', 'realstate'); // replace 'your_upload_preset' with your actual upload preset
  
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error('Error while uploading images:', error);
      // Handle error (e.g., show an alert or toast)
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const formData = new FormData();
      formData.append("file", photo);

      // Upload image to Cloudinary
      const imageUrl = await Cloudinary(formData);
      console.log(imageUrl)

      // Submit product data to the backend with the Cloudinary image URL
      const productData = {
        productName: formInput.productName,
        price: formInput.price,
        color: formInput.color,
        category,
        discount: formInput.discount,
        size: formInput.size,
        brand: formInput.brand,
        stock: formInput.stock,
        username,
        description: formInput.description,
        photo: imageUrl, // Cloudinary image URL
      };

      const response = await axios.post(
        "https://ecomninja.onrender.com/api/v1/product/addproducts",
        productData
      );

      setloading(false);
      setShowSuccessMessage(true);
      setFormHeight("50px");
    } catch (error) {
      setloading(false);
      console.error("Axios request error:", error);
      // Handle error (e.g., show an alert or toast)
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://ecomninja.onrender.com/api/v1/category/addcategory');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <div
        className={`w-fit md:w-full bg-white p-4 rounded-md mt-8 mb-8 ml-2 transition-height duration-500`}
        style={{ height: formHeight }}
      >
      { loading ? (
          <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" wrapperStyle wrapperClass />
        ) : showSuccessMessage ? (
          <div className="text-center text-3xl"> <h1>Your Product is  <Link to='/'>Live</Link></h1> </div>
        ) :  (<form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.productName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formInput.description}
              onChange={handleChange}
            />
          </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">
            Color
          </label>
          <input
            type="text"
            name="color"
            id="color"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.color}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
  <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
    Category
  </label>
  <select
  placeholder="Select A Category"
  name="category"
  id="category"
  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
  onChange={(e) => {
    setCategory(e.target.value);
  }}
>
<option value="">Select a category </option>
  {categories.map((item) => (
    <option key={item._id} value={item.category}>
      {item.category}
    </option>
  ))}
</select>
</div>

        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.discount}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">
            Size
          </label>
          <input
            type="text"
            name="size"
            id="size"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.size}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.brand}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formInput.stock}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-4 flex justify-center items-center w-full">


        { formInput.productName ? ( <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Add Product
          </button> ) : ( <div>
            <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Fill Details to unlock
          </button>
          </div>)}


        </div>
      </form>)}
    </div>
    </div>
  );
};

export default ProductForm;
