import axios from 'axios'
import React from 'react'
const PaymentGateway = ({id}) => {

    const handlepayment = async(e)=>{
        const response = await axios.post(`http://localhost:4000/api/v1/payments/${id}`)
      const url = response.data.payment_link_url;
      console.log(url);
      window.open(`${url}`, '_blank');
    }
  return (
    <div className='w-fit h-auto flex justify-center items-center rounded-lg bg-yellow-400 p-4'>
      <button className='text-2xl font-mono font-bold hover:text-opacity-100 text-opacity-80' onClick={handlepayment}>Proceed to payment</button>
    </div>
  )
}

export default PaymentGateway
