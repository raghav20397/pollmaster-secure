import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
// global context
export const AuthContext = createContext();
// storing user info here, wrapping entire app
export const AuthProvider = ({children}) => {
    const [token, setToken]  = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
// running useeffect once when app loads to check for previous session tokens
    useEffect(() =>{
        const storedToken = localStorage.getItem('token'); 
        const storedUser = localStorage.getItem('user'); 
        if(storedToken && storedUser){
            //decoding token to get userinfo
            try{
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            }
            catch(error){
                // if invalid token
                console.error('Error parsing user: ', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // setToken(null);
                // setUser(null);
                // setIsAuthenticated(false);
            }
        }
    }, []);
    //called from login.jsx
    const login = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        delete axios.defaults.headers.common['Authorization'];
    }
    //the shared common value
    const AuthContextValue = {token, user, isAuthenticated, login, logout};
    return (
        <AuthContext.Provider value = {AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
}