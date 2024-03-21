import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import PaymentGateway from './PaymentGateway';

function PlaceOrderForm() {
  const [cartItems, setCartItems] = useState([]);
  const [orderIds, setOrderIds] = useState(new Set());
  const [uniqueIds , setUniqueIds] = useState([]);
  const [auth, setAuth] = useAuth();
  const userObject = JSON.parse(auth.user);
  const [paymentid , setpaymentid] = useState(null)
 const [customerDetails, setCustomerDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [addressDetails, setAddressDetails] = useState({
    country: '',
    address: '',
    city: '',
    region: 'Delhi',
    postalCode: '',
  });
  useEffect(() => {
    // Load cart items from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    // Use Set to track unique order IDs
    const uniqueOrderIds = new Set();
    for (let cartItem of storedCartItems) {
      uniqueOrderIds.add(cartItem.id);
    }
    setOrderIds(uniqueOrderIds);
    setUniqueIds(Array.from(uniqueOrderIds));
  }, []);

  let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity; 
    }

    
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails({ ...addressDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    const OrderItemsDetails = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      photo: item.img , 
      productName: item.name,
      slug: item.slug,
      price: item.price,
      total: item.quantity * item.price
    }));
    console.log(OrderItemsDetails)
    const orderData = new FormData();
    orderData.append("email", customerDetails.email);
    orderData.append("firstName", customerDetails.firstName);
    orderData.append("lastName", customerDetails.lastName);
    orderData.append("phone", customerDetails.phone);
    orderData.append("country", addressDetails.country);
    orderData.append("address", addressDetails.address);
    orderData.append("city", addressDetails.city);
    orderData.append("region", addressDetails.region);
    orderData.append("postalCode", addressDetails.postalCode);
    orderData.append("username", userObject.username);

    console.log(JSON.stringify(OrderItemsDetails));

    // Convert the array of objects to a JSON string and append it to the FormData
    orderData.append("productsDetails", JSON.stringify(OrderItemsDetails));


   
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/order/placeorder",
        orderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.paymentid);
      setpaymentid(response.data.paymentid);
    } catch (error) {
      console.error("Axios request error:", error);
      throw error;
    }
  };
  return (
    <div className={`flex justify-center items-center flex-col p-4 md:p-0`}>
      <div className={`w-full md:w-1/2 ml-2 mr-2 mt-8 mb-4`}>
       {!paymentid ? ( <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email for Order Confirmation
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={customerDetails.email}
              onChange={handleCustomerChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={customerDetails.firstName}
              onChange={handleCustomerChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={customerDetails.lastName}
              onChange={handleCustomerChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={customerDetails.phone}
              onChange={handleCustomerChange}
            />
          </div>

          <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <select
              name="country"
              id="country"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={addressDetails.country}
              onChange={handleAddressChange}
            >
              <option value="">Select a Country</option>
              <option value={(e)=>{e.target.value}}>India</option>
              
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={addressDetails.address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={addressDetails.city}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="region" className="block text-gray-700 text-sm font-bold mb-2">
              Region
            </label>
            <input
              type="text"
              name="region"
              id="region"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={addressDetails.region}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
              Zip / Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={addressDetails.postalCode}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>) : (<div className='flex justify-center items-center h-96'>
          <h1 className='text-3xl'>Please Complete Your Payments</h1>
        </div>)}

      </div>

    { paymentid && <div className='m-8 rounded-md'>
      <PaymentGateway id = {paymentid}/>
      </div>}
      
    </div>
  );
}

export default PlaceOrderForm;
