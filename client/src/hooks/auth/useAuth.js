// import React from "react";
// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "./AuthProvider";
//
// const PrivateRoute = () => {
//   const { token } = useAuth();
//   if (!token) return <Navigate to="/login" />;
//   return <Outlet />;
// };
//
// export default PrivateRoute;
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";

const getTokenExpiry = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000;
  } catch (e) {
    return null;
  }
};

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("site");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const expiry = getTokenExpiry(token);
    if (!expiry) {
      localStorage.removeItem("site");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      return;
    }

    const now = Date.now();
    if (expiry < now) {
      localStorage.removeItem("site");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    const timeout = expiry - now;
    const timer = setTimeout(() => {
      localStorage.removeItem("site");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
