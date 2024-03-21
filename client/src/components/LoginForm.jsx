import React, { useState } from 'react';
import axios from 'axios'
import { AuthProvider, useAuth } from '../context/auth';
import { Navigate, useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';

function LoginForm() {
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const sendData = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
           setAuth({
            ...auth,
            token: response.data.token ,
            user: response.data.user
    })
    console.log(response.data)
    localStorage.setItem("auth" , JSON.stringify(response.data));
    toast.success(response.data.message);
    navigate("/admin");
    } catch (error) {
      toast.error("An error occurred")
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   await sendData(formData);
  };
  return (
    <>
    <div className='ml-0 md:ml-10'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
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
            Log In
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default LoginForm;
