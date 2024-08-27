import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    
  };

  useEffect(() => {
    // Check local storage for stored user data on component mount
    const userloggedin = localStorage.getItem('USER_LOGGED_IN');
     console.log(userloggedin);
    if (userloggedin==="true" && isLoggedIn === false) {
      const x = userloggedin === "true" ? true : false;
      setIsLoggedIn(x);
      
      
    }
    console.log(isLoggedIn);
  },[]);
  
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}