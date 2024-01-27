import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import OrderCard from './OrderCard'

const Orders = () => {
  return (
   <>
   <div className='flex flex-row'>
   <Sidebar/>
   <OrderCard/>
   </div>
   </>
  )
}

export default Orders
