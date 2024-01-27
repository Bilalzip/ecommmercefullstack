import React, { useState, useContext, createContext, useEffect} from 'react';

const Context = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    });
  useEffect(()=>{ 
    
    const realtime = localStorage.getItem("auth");
  if (realtime) {
      const parsedata = JSON.parse(realtime);
      setAuth({
        ...auth, 
        token: parsedata.token,
user: parsedata.user
})
  }},[]);

    return (
        <Context.Provider value={[auth, setAuth]}>
            {children}
        </Context.Provider>
    );
};

const useAuth = () => useContext(Context);

export { AuthProvider, useAuth };
