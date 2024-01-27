import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
export default function Private() {
    const [auth, setauth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const authCheck = async ()=>{
            const res = await axios.get('https://ecomninja.onrender.com/api/v1/auth/user' , {
                headers:{
                    Authorization: auth?.token
                }
            })
            console.log(res)
            if (res.data.ok){
                setOk(true);
            } else {
                setOk(false)
            }
        };
         if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner/>;
}