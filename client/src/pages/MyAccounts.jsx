import React, { useContext } from 'react'
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import {useAuth} from '../context/auth'
const MyAccounts = () => {
  const [auth, setauth] = useAuth();
  return (
    <>
    <div className='text-black transform-text uppercase text-center bg-[#F7F7F7] p-4 font-serif ' >MY ACCOUNT
</div>
    <div className='ml-4 mt-12 md:ml-[30%] flex flex-col md:flex-row '>
    <RegistrationForm/> <LoginForm />
    </div>
    </>
  )
}

export default MyAccounts
