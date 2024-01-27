import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

const Spinner = () => {

    const[count , setcount] = useState(5);
const navigate = useNavigate();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setcount((e)=> --e)
        }, 1000)
        count === 0 && navigate('/myaccounts')
        return ()=> clearInterval(interval);
    }, [count,navigate])
    
  return (
   <>
    <div className="flex flex-col justify-center bg-[#FFFFFF] w-full h-[30rem] items-center">
        <h1>You are not loged in , we are redirecting you in {count}</h1>

      <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-16 w-16"></div>
    </div></>
  )
}

export default Spinner
