import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const AddCategories = () => {
  const [FormData, setFormData] = useState({
    category: ''
  });
  const [getcategory, setgetcategory] = useState([]);

  const senddata = async (data) => {
    const response = await axios.post(
      'https://ecomninja.onrender.com/api/v1/category/addcategory',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    window.location.reload();
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://ecomninja.onrender.com/api/v1/category/addcategory'
      );
      setgetcategory(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handlecategory = (e) => {
    e.preventDefault();
    senddata(FormData);
  };

  const deletecategory = async (categoryName) => {
    const response = axios.post(
      'https://ecomninja.onrender.com/api/v1/category/delete',
      { category: categoryName },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    window.location.reload();
  };

  return (
    <div>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='md:w-1/3 w-full rounded-md mt-8 mx-2 md:mx-8'>
          <form onSubmit={handlecategory}>
            <div className='mb-4'>
              <label
                htmlFor='category'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Category Name
              </label>
              <input
                type='text'
                name='category'
                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                value={FormData.category}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData({
                    ...FormData,
                    [name]: value
                  });
                }}
                required
                placeholder='Add category name'
              />
            </div>
            <div className='mb-4'>
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'
              >
                Submit
              </button>
            </div>
          </form>

          {getcategory.map((category) => (
            <div key={category._id} className='mb-2'>
              <div className='bg-[#2563EB] w-full h-12 rounded-md flex justify-between items-center text-white font-mono'>
                <div className='ml-2 text-sm'>{category.category}</div>
                <div>
                  <button
                    onClick={() => {
                      deletecategory(category.category);
                    }}
                    className='mr-2 px-2 py-2 rounded-md bg-red-700 hover:bg-red-800 text-white hover:text-white shadow-md transition duration-300 text-xs'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
