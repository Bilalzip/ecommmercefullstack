import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userSearch = queryParams.get('Product');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = new FormData();
        data.append('Product', userSearch);

        const response = await axios.post(
          'https://ecomninja.onrender.com/api/v1/products',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userSearch]);

  return (
    <>
      <div className='flex flex-col md:flex-row h-fit mb-10 md:mb-40'>
        <div className='bg-white w-full md:w-[30rem] h-auto mb-4 md:mb-0 md:ml-12 mt-20 rounded-md'>
          <div className='font-mono ml-6 mt-10 transform uppercase'>
            <h1 className='text-blue-600 text-2xl mb-4'>FILTER BY COLOR</h1>
            <div className='mb-4'>
              <select
                placeholder='Select A COLOR'
                name='color'
                id='color'
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                onChange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              >
                <option value=''>Select a color</option>
                {[...new Set(products.map((item) => item.color))].map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full md:w-[calc(100%-30rem)] ml-6 p-4'>
          <h1 className='mb-6 font-sans text-black text-2xl md:text-3xl'>
            All Relevant Results for <span className='font-bold ml-2'>{userSearch}</span>
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {products
              .filter((item) => !selectedColor || item.color === selectedColor)
              .map((item, index) => (
                <div key={index} className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105'>
                  <Link to={`/category/${item.category}/${item.slug}`}>
                    <img src={item.photo} className='w-full h-64 object-cover object-center' alt={item.productName} />
                  </Link>
                  <div className='px-4 py-2'>
                    <h2 className='text-gray-900 font-bold text-xl text-center'>{item.productName}</h2>
                    <p className='mt-2 text-gray-600 text-center'>${item.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
