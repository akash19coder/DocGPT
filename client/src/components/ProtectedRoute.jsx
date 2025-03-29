import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addUser } from "../utils/userSlice";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthenticated = async () => {
      const response = await fetch("http://localhost:3002/api/v1/user/profile");

      const data = await response.json();
      console.log("i am from protected route", data);
      if (data.error) {
        // setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
      dispatch(addUser(data.user));
    };
    checkAuthenticated();
  }, []);
  console.log("i am console.log");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
