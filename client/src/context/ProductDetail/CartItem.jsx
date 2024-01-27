import React, { useState, useContext, createContext, useEffect} from 'react';

const Context = createContext();

const CartItemProvider = ({ children }) => {
    const [placeOrder , setplaceOrder] = useState([]);
    
    return (
        <Context.Provider value={[placeOrder, setplaceOrder]}>
            {children}
        </Context.Provider>
    );
};

const useOrder = () => useContext(Context);

export { CartItemProvider, useOrder };
