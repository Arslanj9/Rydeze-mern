// AuthContext.js
import { createContext, useContext, useState } from 'react';
import {useEffect} from 'react'
import axios from 'axios';



// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);



  // Check localStorage for user data and role on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    if (storedUser) {
      // setUserId(storedUser);
      setIsLoggedIn(true);
    }
  }, []);



  // Function to handle login
  const login = async (userId, password) => {
    try {

      // const apiUrl = import.meta.env.VITE_API_URL;
      const apiUrl = "https://rydeze-mern-backend.onrender.com";

      const response = await axios.post(`${apiUrl}/api/users/login`, { userId, password, });

      setIsLoggedIn(true);
      setUserRole(response.data.user.userRole)
      setError(null); // Clear any previous errors

      // Store user in localStorage
      localStorage.setItem('userId', response.data.user._id);
      localStorage.setItem('userRole', response.data.user.userRole);



    } catch (err) {
      console.error("Login error:", err); // Log detailed error information
      setIsLoggedIn(false); // Set login status to false on failure
      setError('Invalid username or password');
    }
  };



  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);

    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  };




  return (
    <AuthContext.Provider
      value={{
        login,
        error,
        setError,
        isLoggedIn,
        userRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
