import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';
import { useOrder } from '../context/ProductDetail/CartItem';
import toast from 'react-hot-toast';
const ProductDetail = () => {
  const navigate = useNavigate()
  const [placeOrder, setplaceOrder] = useOrder();
  const { slug } = useParams();
  const [pro, setpro] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const getproduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/product/addproducts/${slug}`);
        setpro(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getproduct();
  }, [slug]);

 

  const handleAddToCart = (color, size, id, slug, price, productName) => {
    const newItem = {
      id: id,
      size: size,
      color: color,
      price: price,
      slug: slug,
      name: productName,
      img: pro.photo,
      quantity: quantity
    };
  
    // Retrieve existing items from local storage
    const existingItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if the item is already in the cart using a loop
    let isItemInCart = false;
    for (let i = 0; i < existingItems.length; i++) {
      if (existingItems[i].id === id) {
        isItemInCart = true;
        break; // exit the loop once the item is found
      }
    }
  
    if (isItemInCart) {
      toast.error("Already added to cart");
    } else {
      // Combine existing items with the new item
      const newItems = [...existingItems, newItem];
  
      // Save the updated items array back to local storage
      localStorage.setItem('cart', JSON.stringify(newItems));
  
      // Update the state with the new items
      setplaceOrder(newItems);
      navigate('/cart');
    }
  };
  return (
    <>
      <div className='flex flex-col h-fit'>
        <div className='flex flex-col md:flex-row '>
        <div>
        <img className='w-fit h-auto object-cover' src={pro.photo}/>
        </div>
        <div className='md:w-1/2 bg-[#E6E7E8] rounded-md md:m-8 mt-8 h-fit'>
          <div className='ml-4'>
            <div className='mt-4 flex items-center justify-center text-2xl mb-4 font-bold'>{pro.productName}</div>
            <h1 className='text-2xl'> Price: {pro.price} INR</h1>
            <div className='mt-3'>{pro.description}</div>
            <div className='font-bold mt-2'>
              <div>Stock : {pro.stock}</div>
              <div>Color : {pro.color}</div>
              <div>Size : {pro.size}</div>
              <div>
                Quantity:
                <input
                  type='number'
                  min='1'
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className='ml-2 border rounded-md p-1 w-16'
                />
              </div>
            </div>

            <button onClick={()=> handleAddToCart(pro.color , pro.size , pro._id , pro.slug , pro.price, pro.productName , pro.photo, quantity) } className='bg-blue-600 opacity-90 hover:opacity-100 text-white py-3 px-2 rounded-md hover:bg-cyan-500 duration-500 mt-2 mb-2'>
              Add to cart
            </button>
          </div>
        </div>
        </div>

        <div className='flex flex-col'>
          <h1 className='text-2xl font-sans font-bold ml-8 mt-4 mb-4'> Similar Products</h1>
          <RelatedProducts name = {pro.category}/>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
