import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceOrderForm from '../components/PlaceOrderForm';
const PlaceOrder = () => {
  return (
   
     <div className='flex flex-col'>
      <PlaceOrderForm/>
     </div>

  )
}

export default PlaceOrder
