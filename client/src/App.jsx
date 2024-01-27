import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes} from 'react-router-dom';
import MyAccounts from './pages/myaccounts';
import Dashboard from './pages/Dashboard';
import Private from './Routes/Private';
import ProductForm from './components/ProductForm';
import AddCategories from './components/AddCategories';
import Orders from './components/Orders';
import AdminProfile from './components/AdminProfile';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import PlaceOrder from './pages/PlaceOrder'
import OrderPlaced from './components/OrderPlaced';
import Products from './pages/Products';
import CategoryProducts from './components/CategoryProducts';
import toast, { Toaster } from 'react-hot-toast';
import AddtoCart from './components/AddtoCart';
import Contact from './components/froms/Contact';

function App() {
  return (
  
   <>
   <Toaster position='top-center' /> 
   <Navbar/>
   <Routes>
    <Route path = '/contact-us' element = {<Contact/>} />
    <Route  path='/cart' element={<AddtoCart/>}/>
    <Route path ='/category/:category' element= {<CategoryProducts/>} />
   <Route path='/category/:category/:slug' element={<ProductDetail/>}/>
   <Route path = '/placeorder' element={<PlaceOrder/>}/>
   <Route path = '/payments/:orderId' element={<OrderPlaced/>}/>
   <Route path = "/products/" element = {<Products/>}/>
    <Route path='/' element={<Home/>}/>
   <Route path='/admin' element={<Private/>}>
    <Route path='' element = {<Dashboard/>}/>
    <Route path = '/admin/addproducts' element = {<ProductForm/>} />
    <Route path = '/admin/addcategories' element = {<AddCategories/>} />
    <Route path = '/admin/dashboard' element= {<Dashboard/>}/>
    <Route path = '/admin/orders' element = {<Orders/>} />
    <Route path = '/admin/profile' element = {<AdminProfile/>} />
    </Route>
    <Route path='/myaccounts' element = {<MyAccounts/>}/>
   </Routes>
     <Footer/>   </>
    
   
    
  );
}                         

export default App;
