import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { setuser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        let response = await axios.post(
          "http://localhost:3000/user/logout",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        setuser(null);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate, setuser]);

  return null; // No UI needed for logout
};

export default Logout;
