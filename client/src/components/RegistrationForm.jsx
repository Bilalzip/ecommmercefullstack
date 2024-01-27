import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

  const navigate = useNavigate();
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullname: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const sendData = async (data) => {
    try {
      const response = await axios.post('https://ecomninja.onrender.com/api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success("Successfully registered");
      navigate("/admin");
      
    } catch (error) {
      console.error('Axios request error:', error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData(formData);
  };

  return (
    <div className='ml-0 md:ml-8 mb-10'>
      <form onSubmit={handleSubmit}>
        <div className='max-w-md mx-auto'>
          <div className='mb-4'>
          <label htmlFor='fullname' className='block text-gray-600'>Full Name</label>
            <input
              id='fullname'
              type='text'
              placeholder='Full Name'
              name='fullname'
              value={formData.fullname}
              onChange={handleInputChange}
              required
              className='border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-400 transition duration-300'
            />
            <label htmlFor='username' className='block text-gray-600'>Username</label>
            <input
              id='username'
              type='text'
              placeholder='Username'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              required
              className='border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-400 transition duration-300'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-600'>Email address</label>
            <input
              id='email'
              type='email'
              placeholder='Email address'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              className='border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-400 transition duration-300'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-600'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
              className='border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-400 transition duration-300'
            />
          </div>
          <div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300'
            >
              Register
            </button>
          </div>
        </div>
        <p className='max-w-sm mt-8'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
      </form>
      
    </div>
  );
}

export default RegistrationForm;
