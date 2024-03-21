import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderPlaced = () => {
  // Extract the orderId and razorpay_payment_id from the URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const {orderId} = useParams();
  const razorpayPaymentId = queryParams.get('razorpay_payment_id');
useEffect(() => {
    const fetchData = async () => {
      try {
        // Send the orderId and razorpayPaymentId to your backend API
        const response = await axios.get(`http://localhost:4000/api/v1/payments?orderId=${orderId}&razorpayPaymentId=${razorpayPaymentId}`);
        const cart = localStorage.removeItem("cart");
        console.log(cart)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [orderId, razorpayPaymentId]);

  
  const[count , setcount] = useState(2);
  const navigate = useNavigate();
  useEffect(()=>{
      const interval = setInterval(()=>{
          setcount((e)=> --e)
      }, 1000)
      count === 0 && navigate('/user');
      return ()=> clearInterval(interval);
  }, [count,navigate])

  return (
    <div className='h-screen w-full bg-slate-300 flex justify-center items-center text-xl font-mono flex-col'>
      <h1 className='text-2xl'>Your order is placed</h1>
      <span className='mt-4'> Cool, You made it we are packing your product. Keep an eye on the Orders Section</span>
      <span className='mt-4'>We are redirecting you to Orders page in {count}</span>
    </div>
  );
}
export default OrderPlaced;
