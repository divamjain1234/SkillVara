import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext); // ✅ Use logout from context
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Calls the logout function from AuthContext
    navigate("/"); // Redirect to home
  }, [logout, navigate]);

  return null; // No UI needed
};

export default Logout;
