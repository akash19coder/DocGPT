import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/user/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.error(
            "Authentication check failed with status:",
            response.status
          );
          setIsAuthenticated(false);
        } else {
          const data = await response.json();
          console.log("i am from protected route", data);
          if (data.error) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
            dispatch(addUser(data));
          }
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthenticated();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
