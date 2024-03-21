import React, { useEffect } from 'react'
import { useAuth } from '../context/auth'
import { Outlet, useNavigate } from 'react-router-dom';
import Spinnerbuyer from '../components/Spinner-buyer';

export default function PrivateBuyer() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
        return auth.token ? <Outlet /> : <Spinnerbuyer/>;  
}
