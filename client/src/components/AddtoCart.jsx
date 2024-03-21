import React, { useEffect, useState } from 'react';
import { useOrder } from '../context/ProductDetail/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseOrderProvider } from '../context/ProductDetail/OrderDetails';

const CartPage = () => {
  const [placeOrder, setPlaceOrder] = useOrder();
  const [cartItems, setCartItems] = useState([]);
  const [orderIds, setOrderIds] = useState(new Set());
  const [uniqueIds, setUniqueIds] = useState([]);
  const navigate = useNavigate();
  const [totalCart, setTotalCart] = useState();



  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);

    const uniqueOrderIds = new Set();
    for (let cartItem of storedCartItems) {
      uniqueOrderIds.add(cartItem.id);
    }
    setOrderIds(uniqueOrderIds);
    setUniqueIds(Array.from(uniqueOrderIds));
  }, []);

  const removeProduct = (id) => {
    const updatedCartProducts = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCartProducts));
    setCartItems(updatedCartProducts);

    // Remove the deleted product's ID from the Set
    setOrderIds((prevOrderIds) => {
      const newOrderIds = new Set(prevOrderIds);
      newOrderIds.delete(id);
      return newOrderIds;
    });
  };

  const HandleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/placeorder');
    } else {
      toast.error('Your cart is empty');
    }
  };

  useEffect(() => {
    // Recalculate the total whenever cartItems or placeOrder changes
    let total = 0;
    for (let item of cartItems) {
      total = total + item.price * item.quantity;
    }
    setTotalCart(total);
  }, [cartItems, placeOrder]);

  return (
    <div className="container p-4 md:p-2 h-screen ">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {placeOrder.size === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {/* Render each item in the cart */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeProduct(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <p className="text-lg font-semibold">Total: ₹{totalCart}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={HandleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;