import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Unified auth state update
  const updateAuthState = (userData, authenticated) => {
    setUser(userData);
    setisAuthenticated(authenticated);
  };

const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`, 
        {}, 
        { withCredentials: true }
      );
      updateAuthState(null,false)
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear user even if API fails
     updateAuthState(null,false)
    }
  };


  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      
      // Use the unified updater
      updateAuthState(response.data.user, true);
      return { success: true, data: response.data };
    } catch (error) {
      updateAuthState(null, false);
      return { success: false, error: error.response?.data || error.message };
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/auth`, {
          withCredentials: true
        });
        updateAuthState(response.data.user, true);
      } catch (error) {
        console.log(error)
        updateAuthState(null, false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      logout,
      login,
      signup: async ({ username, email, password }) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/signup`,
            { username, email, password },
            { withCredentials: true }
          );
          updateAuthState(response.data.user, true);
          return { success: true, data: response.data };
        } catch (error) {
          updateAuthState(null, false);
          return { success: false, error: error.response?.data || error.message };
        }
      }
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
