import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const tokenState = useSelector((state) => state.userReducer.token);
  const tokenLocalStorage = localStorage.getItem("token");
  const navigate = useNavigate();

  // if token not found, redirect to login page
  useEffect(() => {
    if (!tokenState?.token && !tokenLocalStorage) {
      navigate("/login");
    }
  }, [navigate, tokenState, tokenLocalStorage]);

  return <Outlet />;
};

export default PrivateRoute;
