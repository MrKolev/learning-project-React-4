import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) { setIsLoggedIn(true) }
      }, []);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("token", "1")
        setIsLoggedIn(true);
      };

      const logoutHandler = () => {
        localStorage.clear()
        setIsLoggedIn(false);
      };

      return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }} >{props.children}</AuthContext.Provider>
}