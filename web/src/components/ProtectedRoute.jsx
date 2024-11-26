
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { showToast } from "../utils/config";

const decodeToken = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return true;
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() > expirationTime;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation(); 

  useEffect(() => {
    if (!token) {
      showToast("Token is not available. Please log in.", "error");
    } else if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      showToast("Token has expired. Please log in again.", "error");
    }
  }, [location.pathname]); 

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

