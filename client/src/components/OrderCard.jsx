import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Audio, Bars } from 'react-loader-spinner';

// ... (imports remain the same)

const OrderCard = () => {
  const [loader , setloader] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('IsShipped');
  const [auth, setAuth] = useAuth();
  const userObject = JSON.parse(auth.user);
  const username = userObject.username;

  const isAdmin = userObject.role === 1;

  useEffect(() => {
    const findProducts = async (data) => {
      const response = await axios.post(`http://localhost:4000/api/v1/order`, { data });
      setOrders(response.data);
      setloader(!loader)
      console.log(response.data);
    };
    findProducts(username);
  }, [username]);

  const onSubmitStatus = async (id) => {
    console.log(id);
    console.log(orderStatus);
    const response = await axios.post("http://localhost:4000/api/v1/order/status", { orderStatus, id });
    console.log(response);
  };

  const EditOrderDetails = async (id) => {
    const response = await axios.post("http://localhost:4000/api/v1/order/remove", { id });
    toast.success(response.data.message);
    window.location.reload();
  }

  return (
    <div className='ml-8 mt-12 flex flex-row'> 
    { !loader ? (
      <section>
        {orders?.map((item, index) => (
          item && item.productsDetails && item.productsDetails.length > 0 && (
            <div key={index || item.productsDetails[0]?.slug} className='p-4 w-fit md:h-96 h-1/4 flex md:flex-row font-sans flex-col md:justify-between md:m-8 mt-8'>
              <Link to={`/category/:category/${item.productsDetails[0]?.slug}`}>
                <img className='md:w-fit h-full rounded-md w-full' src={item.productsDetails[0]?.photo} alt="villa image" />
              </Link>
              <div className='flex flex-col md:ml-2 mt-3 md:mt-0'>
                <h1 className='text-3xl font-semibold'>{item.productsDetails[0]?.productName}</h1>
                {!isAdmin ? (
                  <div>
                    <span>Order Status : </span> {item.orderStatus}
                  </div>
                ) : (
                  <div className='flex flex-col md:flex-row mt-8 rounded-lg gap-4'>
                    <select
                      className='p-2 border border-white rounded-md focus:outline-none focus:border-indigo-500 bg-white text-gray-700'
                      onChange={(e) => setOrderStatus(e.target.value)}
                      value={orderStatus}
                    >
                      <option  className='text-gray-400'>
                      Select order state
                      </option>
                      <option value='IsShipped' className='text-green-500'>
                        Is Shipped
                      </option>
                      <option value='OutForDelivery' className='text-blue-500'>
                        Out for Delivery
                      </option>
                      <option value='Cancelled' className='text-blue-500'>
                        Cancelled
                      </option>
                    </select>
                    <button
                      type='submit'
                      onClick={() => onSubmitStatus(item._id)}
                      className='p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 px-4 py-2'
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
              <div className='flex md:flex-col flex-row justify-between mt-4 md:mt-0 md:gap-8 gap-0 ml-3'>
                <Link to={`/category/:category/${item.productsDetails[0]?.slug}`}>
                  <button className='bg-blue-600 text-white rounded-md font-semibold px-2 py-3'>Explore</button>
                </Link>
                <button onClick={() => EditOrderDetails(item._id)} className='bg-blue-600 text-white rounded-md font-semibold px-2 py-3'>
                  Remove
                </button>
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

export default OrderCard;
