import React, { useState, useContext, createContext, useEffect} from 'react';

const Context = createContext();

const OrderProvider = ({ children }) => {
    const [Order , SetOrder] = useState({
        id: "",
        size: "",
        color: "",
        price: "",
        slug: "",
        name: "",
        img: "",
        quantity: ""
    });
    
    return (
        <Context.Provider value={[Order, SetOrder]}>
            {children}
        </Context.Provider>
    );
};

const UseOrderProvider = () => useContext(Context);

export { OrderProvider, UseOrderProvider };
