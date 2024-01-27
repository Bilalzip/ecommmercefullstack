import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Router, Routes, BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/auth.jsx'
import { CartItemProvider } from './context/ProductDetail/CartItem.jsx'
import { OrderProvider } from './context/ProductDetail/OrderDetails.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartItemProvider>
      <OrderProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter> </OrderProvider>
    </CartItemProvider>
     </AuthProvider>
  </React.StrictMode>,
)
