import React from 'react'

const BuyerUserStats = () => {
  return (
<div className='flex flex-row'>
    <div className='bg-white w-full h-full p-2'>
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-users text-2xl text-blue-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Total Orders</p>
              <p className="text-3xl font-bold">{0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-shopping-cart text-2xl text-green-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Cancelled Orders</p>
              <p className="text-3xl font-bold">{0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <i className="fas fa-box text-2xl text-yellow-500 mr-4"></i>
            <div>
              <p className="text-gray-600 text-lg font-semibold">Delivered Orders</p>
              <p className="text-3xl font-bold">{0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </div>
  )
}

export default BuyerUserStats
