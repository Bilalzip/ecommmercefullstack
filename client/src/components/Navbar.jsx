import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    navigate('/')
  };

  const [open, setOpen] = useState(false);


  const handleDashboard = ()=>{
    navigate('/admin')
  }

  return (
    <nav className='p-5 bg-white shadow md:flex md:items-center md:justify-center w-full'>
      <div className='flex justify-between items-center'>
      <Link to={"/"}><span className='text-2xl font-sans'>Farm Ninja</span></Link>  

        <span
          className='text-3xl cursor-pointer md:hidden block'
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </span>
      </div>

      <ul
        className={`md:flex md:items-center md:static md:w-auto z-40 absolute bg-white w-full left-0 md:py-0 py-4 md:pl-0 pl-7 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <li className='mx-4 my-6 md:my-0'>
          <a href="/" className='text-xl hover:text-cyan-500 duration-500'>
            Home
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href="/category/Fertilizers" className='text-xl hover:text-cyan-500 duration-500'>
          Fertilizers
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href="/category/Gardening " className='text-xl hover:text-cyan-500 duration-500'>
          Gardening
          </a>
        </li>
        <li className='mx-4 my-6 md:my-0'>
          <a href="/contact-us" className='text-xl hover:text-cyan-500 duration-500'>
            Contact
          </a>
        </li>

        <Link to={!auth.user ? '/myaccounts' : '/admin'}>
        {


           !auth.user ? (
          
          <button className='bg-cyan-500 text-white font-sans duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded'>
          Get Started
        </button> ) : (

          <div className='flex flex-col md:flex-row md:gap-4 gap-2 '>
  <button onClick={handleLogout} className='bg-cyan-500 text-white font-sans duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded'>
          Logout
        </button>
        <button onClick={handleDashboard} className='bg-cyan-500 text-white font-sans duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded'>
          Dashboard
        </button>
          </div>
        
        
        )
        }
      </Link>
        
      </ul>
    </nav>
  );
};

export default Navbar;
