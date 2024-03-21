import React, { useEffect, useState } from 'react';
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
    username:userObject.username || "",
    fullname: userObject.fullname ||'',
    phone: "",
    email: userObject.email ||'',
    website: '',
    image: "",
  });
  
  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/auth/profile", {
          username: userObject.username
        });
        console.log(response.data); 
       setTimeout(() => {
        if (response.data.image === ""){
          toast.message("Your image has not been saved , please try again")
        }
       }, 3000);
        // Update only the image and website fields, keep the rest as is
        setFormData(prevData => ({
          ...prevData,
          image: response.data.image,
          website: response.data.website,
          phone: response.data.phone
        }));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    getProfileImage();
  }, []);
  

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
  
    if (takeimage !== null && takeimage) {
      const imageData = new FormData();
      imageData.append("file", takeimage);
      imageData.append('upload_preset', 'realstate');
  
      try {
        const imageUrl = await Cloudinary(imageData);
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl,
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        return; // Stop further execution if image upload fails
      }
    }
  
    try {
      console.log(formData)
      const response = await axios.post("http://localhost:4000/api/v1/auth/profile/edit", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };
  
  return (
    <div className='flex flex-row '>
      <Sidebar />
      <div className='mx-auto mt-24'>
        <div>
        <div className='w-36 h-36 rounded-full overflow-hidden'>
            <label htmlFor='imageUpload' className='cursor-pointer'>
              {takeimage ? (
               <img
               src={takeimage ? URL.createObjectURL(takeimage) : formData.image || userObject.image || '/src/assets/admin-icon.png'}
               alt='Profile'
               className='w-full h-full object-cover'
             />             
              ) : (
                <img
                  src={formData.image || '/src/assets/admin-icon.png'}
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

