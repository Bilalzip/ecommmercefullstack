import React from 'react'
import BuyerUserStats from '../components/BuyerUserStats';
import { useAuth } from '../context/auth';
import BuyerUserOrders from '../components/BuyerUserOrders';

const Buyer = () => {
 const [auth , setAuth]= useAuth();
 const parsedUser = JSON.parse(auth.user);
 const {_id} = parsedUser;
 console.log(_id)
  return (
    <div className=' flex flex-col'>
       <BuyerUserStats />
    <BuyerUserOrders  userId = {_id} />
   
    </div>
  )
}

export default Buyer;
