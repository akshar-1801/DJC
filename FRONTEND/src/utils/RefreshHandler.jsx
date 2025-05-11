import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const data = localStorage.getItem("user-info");
        const token = JSON.parse(data)?.token;

        if (token) {
          setIsAuthenticated(true);
          if (location.pathname === "/login") {
            navigate("/", { replace: true });
          }
        } else {
          setIsAuthenticated(false);
          if (
            location.pathname !== "/login" &&
            location.pathname !== "/" &&
            location.pathname !== "/home" &&
            location.pathname !== "/products" &&
            !location.pathname.startsWith("/products/")
          ) {
            navigate("/login", { replace: true });
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/" &&
          location.pathname !== "/home" &&
          location.pathname !== "/products" &&
          !location.pathname.startsWith("/products/")
        ) {
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [location.pathname, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;