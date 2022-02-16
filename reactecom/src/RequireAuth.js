import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    axios.get(`/api/checkAuth`).then((res) => {
      if (res.status === 200) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    });

    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  // console.log(isAuthenticated);

  // const isAuthenticated = axios.get("api/checkAuth").then((res) => {
  //   if (res.status === 200) return true;
  //   else return false;
  // });
  // const isAuthenticated = false;

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(error) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Unauthorized",
          text: error.response.data.message,
          icon: "error",
        });
        return <Navigate to="/login" state={{ from: location }} />;
      } else if (error.response.status === 403) {
        Swal.fire({
          title: "Unauthorized",
          text: error.response.data.message,
          icon: "error",
        });
        return <Navigate to="/" state={{ from: location }} />;
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
