import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast'
const AdminProfile = () => {
  const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dauwgr7yd"
  const [auth, setAuth] = useAuth();
  const userObject = JSON.parse(auth.user);
  const [takeimage , settakeimage] = useState(null);
  const [formData, setFormData] = useState({
    username: userObject.username || "",
    fullname: userObject.fullname || '',
    phone: '',
    email: userObject.email || '',
    website: '',
    image: "",
  });
  
  const handleInputChange = (e) => {
    const {value , name } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    settakeimage(file);
  };
  const Cloudinary = async (data) => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      console.error('Error while uploading images:', error);
    }
  };

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", takeimage);
    imageData.append('upload_preset', 'realstate');

    if (takeimage !== null && takeimage){
      const imageUrl = await Cloudinary(imageData);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
    const response = await axios.post("https://ecomninja.onrender.com/api/v1/auth/profile/edit", formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTimeout(() => {
      toast.success(response.data.message);
    }, 3000);
  };
  
  return (
    <div className='flex flex-row '>
      <Sidebar />
      <div className='mx-auto mt-24'>
        <div>
        <div className='w-36 h-36 rounded-full overflow-hidden hover:bg-black'>
            <label htmlFor='imageUpload' className='cursor-pointer'>
              {takeimage ? (
                <img
                  src={URL.createObjectURL(takeimage)}
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <img
                  src={userObject.image}
                  alt=''
                  className='w-full h-full object-cover'
                />
              )}
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className='form mt-16'>
            <form onSubmit={handleProfileChange}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
              
              onChange={handleInputChange}
              value={formData.username}
                type="text"
                name="username"
                id="firstName"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
               onChange={handleInputChange}
              value={formData.fullname}
                type="text"
                name="fullname"
                id="firstName"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>


            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
              onChange={handleInputChange}
              value={formData.phone}
                type="tel"
                name="phone"
                id="phone"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
               onChange={handleInputChange}
               value={formData.email}
             
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">
                Website
              </label>
              <input
              onChange={handleInputChange}
              value={formData.website}
                type="url"
                name="website"
                id="website"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

              <div className='mb-4 flex justify-center items-center'>
              <button
              type='submit'  // Change this line
              className='bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'
            >
              Submit
            </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

