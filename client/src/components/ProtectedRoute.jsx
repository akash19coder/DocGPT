import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = () => {
  //write authenticated logic here...it is going to come from Redux Store...
  console.log(document.cookie);

  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
