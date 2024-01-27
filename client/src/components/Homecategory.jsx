import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'
import { Bars } from 'react-loader-spinner';

const Homecategory = () => {
  const [product, setProduct] = useState([]);
  const [loader , setloader] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios.get('https://ecomninja.onrender.com/api/v1/product/addproducts');
      setProduct(response.data);
      setloader(!loader)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <main>
      <h1 className='text-2xl flex justify-center items-center mt-8'>All Products</h1>
 { loader ? (
 

<div className='flex justify-center items-center m-16'>
<Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
</div>


) :  <div>
      <div>
        <div>
          <div className='w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 mt-4'>
              {product.map((item, index) => (
                <div key={index} className="w-96 p-4 flex-shrink-0 transition-transform transform hover:scale-105">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Link to={`/category/${item.category}/${item.slug}`}>
                       <img
                        src={item.photo}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{item.productName}</h2>
                      <p className="text-gray-600">{item.brand}</p>
                      <p className="text-gray-600">Category: {item.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xl font-semibold text-indigo-600">${item.price}</div>
                        <div className="text-sm text-gray-500">
                          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>}
    </main>
   
  )
}

export default Homecategory;
