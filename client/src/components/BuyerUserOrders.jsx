

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Audio, Bars } from 'react-loader-spinner';

// ... (imports remain the same)

const BuyerUserOrders = ({userId}) => {
    console.log(userId)
  const [loader , setloader] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('IsShipped');
  const [auth, setAuth] = useAuth();
  const userObject = JSON.parse(auth.user);
  const username = userObject.username;

  useEffect(() => {
    const findProducts = async (data) => {
      const response = await axios.post(`http://localhost:4000/api/v1/order`, { data });
      setOrders(response.data);
      setloader(!loader)
      console.log(response.data);
    };
    findProducts(username);
  }, [username]);

  return (
    <div className='ml-8 mt-12 flex flex-col'> 
    <h1 className="text-3xl p-3 font-sans font-semibold">Recent Orders</h1>
    { !loader ? (
      <section>
        {orders?.map((item, index) => (
          item && item.productsDetails && item.productsDetails.length > 0 && (
            <div key={index || item.productsDetails[0]?.slug} className='p-2 w-fit md:h-96 h-1/4 flex md:flex-row font-sans flex-col'>
              <Link to={`/category/:category/${item.productsDetails[0]?.slug}`}>
                <img className='md:w-auto h-full rounded-md w-full' src={item.productsDetails[0]?.photo} alt="villa image" />
              </Link>
              <div className='flex flex-col md:ml-2 mt-3 md:mt-0'>
                <h1 className='text-3xl font-semibold'>{(item.productsDetails[0]?.productName)}</h1>
                  <div className='mt-4 flex flex-col gap-2'>
                   <div className='flex flex-row gap-1'><span className='font-bold'>Order Status : </span> <span>{item.orderStatus}</span></div> 
                    <div className='flex flex-row gap-1'><span className='font-bold'>Total : </span> <span>{item.productsDetails[0]?.total}</span></div>
                   <div className='flex flex-row gap-1'> <span className='font-bold'>Quantity : </span><span> {item.productsDetails[0]?.quantity}</span></div>
                  </div>
              </div>
            </div>
          )
        ))}
      </section> ) : (
       
<div className='flex justify-start md:justify-center'>
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
      )}
    </div>
  );
};

export default BuyerUserOrders;
