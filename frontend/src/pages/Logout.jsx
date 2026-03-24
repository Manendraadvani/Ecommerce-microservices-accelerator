import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider"; 
import { useNavigate } from "react-router-dom";
 
const Logout = () => {
  const { logoutUser } = useAuth(); 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (logoutUser) {
      logoutUser();
    }
    navigate("/");
  }, [logoutUser, navigate]);
 
  return null; 
};
 
export default Logout;