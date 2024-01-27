import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
const Dashboard = () => {

       const [orders , setorders] = useState([])

  useEffect(()=>{
             
    const orders =  async ()=>{
      const response = await axios.get("https://ecomninja.onrender.com/api/v1/order");
      console.log(response.data)
      setorders(response.data)
    }
     orders()
 }, [])


  const [product , setproduct] = useState([])
  const getproducts = async ()=>  {
      try {
        const response = await axios.get('https://ecomninja.onrender.com/api/v1/product/addproducts');
        setproduct(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    useEffect(()=>{
      getproducts();
    }, [])

   // Mock data for illustration purposes
   const totalUsers = 1000;
   const totalOrders = 500;
   const totalProducts = 200;
 
   // Mock data for graphs (You may need to use a chart library like Chart.js)
   const orderData = [30, 40, 45, 55, 60, 65, 70, 80, 90, 100, 110, 120];
   const userData = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
  return (
    <>
    <div className='flex flex-row '>
    <Sidebar/>
    <div className='bg-white w-full h-full mt-12 ml-10'>
    <div className='mt-10 ml-10 mr-10 mb-20'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-users text-2xl text-blue-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Total Users</p>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-shopping-cart text-2xl text-green-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Total Orders</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-box text-2xl text-yellow-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Total Products</p>
              <p className="text-3xl font-bold">{product.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="mt-8">
        {/* Order Graph (You may need to replace this with a proper chart library) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 text-lg font-semibold mb-4">Order Graph</p>
          {/* Replace with your chart component */}
          <div className="w-full h-48 bg-gray-200"></div>
        </div>

        {/* User Graph (You may need to replace this with a proper chart library) */}
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 text-lg font-semibold mb-4">User Graph</p>
          {/* Replace with your chart component */}
          <div className="w-full h-48 bg-gray-200"></div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard
