import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useAuth } from '../context/auth';
import {ResponsiveContainer , LineChart , Line , CartesianGrid, XAxis, YAxis} from "recharts"
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const user = JSON.parse(auth.user);
    const getStats = async (userId) => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/stats", {
          userid: userId
        });
        setStats(response.data. Stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    if (auth.user) {
      getStats(user._id);
    }
  }, [auth.user]);

  return (
    <>
      <div className='flex flex-row '>
        <Sidebar />
        <div className='bg-white w-full h-full m-4'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total Users Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <i className="fas fa-users text-2xl text-blue-500 mr-4"></i>
                <div>
                  <p className="text-gray-600 text-lg font-semibold">Total Users</p>
                  <p className="text-3xl font-bold">{ 0 || stats?.totalUsers}</p>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <i className="fas fa-shopping-cart text-2xl text-green-500 mr-4"></i>
                <div>
                  <p className="text-gray-600 text-lg font-semibold">Total Orders</p>
                  <p className="text-3xl font-bold">{ 0 || stats?.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <i className="fas fa-box text-2xl text-yellow-500 mr-4"></i>
                <div>
                  <p className="text-gray-600 text-lg font-semibold">Total Products</p>
                  <p className="text-3xl font-bold">{ 0 || stats?.totalProducts}</p>
                </div>
              </div>
            </div>
          </div>
     <div className="mt-8">
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
