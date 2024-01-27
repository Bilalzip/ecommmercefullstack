// EditOrderForm.js
import React, { useState } from 'react';

const EditOrderForm = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isShipped, setIsShipped] = useState(false);
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    
    <form onSubmit={handleSubmit} className="form p-10">
      <div className="mb-4 ">
        <label htmlFor="paymentStatus" className="block text-gray-700 text-sm font-bold mb-2">
          Payment Status
        </label>
        <input
          type="text"
          name="paymentStatus"
          id="paymentStatus"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="isShipped" className="block text-gray-700 text-sm font-bold mb-2">
          Shipped
        </label>
        <select
          name="isShipped"
          id="isShipped"
          value={isShipped}
          onChange={(e) => setIsShipped(e.target.value === 'true')}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="true">True</option>
          <option value="false">False</option>
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
   
  );
};

export default EditOrderForm;
