import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom'

const CategoryProducts = () => {
    const [data , setdata] = useState([])
    const [imageUrls, setImageUrls] = useState({});
    const [imgloader, setimgloader] = useState(true)
    const params = useParams();
    const {category} = params;
    console.log(category)
    useEffect(() => {
        const FetchProductsCategoryWise = async () => {
            const response = await axios.get(`http://localhost:4000/api/v1/category/${category}`);
            console.log(response.data.products);
            setdata(response.data.products);
        }
        FetchProductsCategoryWise();
    }, [category]);
  return (
    <div className='flex flex-col h-screen'>
        <h1 className='text-2xl text-center font-bold mt-4 '>
            Category : {params.category}
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 mt-4'>
              { data.length > 0 ?   data.map((item, index) => (
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
              )) :
              
              (
              
              <div className='text-2xl flex justify-center items-center'>
                <h1>Sorry we got nothing</h1>
              </div>)
              
              }
        </div>
      
    </div>
  )
}

export default CategoryProducts
