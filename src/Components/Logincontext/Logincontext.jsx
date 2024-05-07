import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  token: "",
  refToken: "",
  customerImage: null,
  login: (access, refresh) => {},
  logout: () => {},
  setUserImage: (image) => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
  const [refToken, setRefToken] = useState(localStorage.getItem("refreshToken") || null);
  const [customerImage, setCustomerImage] = useState(null);

  const loginHandler = (access, refresh) => {
    setAuthToken(access);
    setRefToken(refresh);
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const logoutHandler = () => {
    setAuthToken(null);
    setRefToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const setCustomerImageHandler = (image) => {
    setCustomerImage(image);
  };

  const refreshAccessToken = async () => {
    try {
      if (refToken) {
        const decodedRefreshToken = decodeJwt(refToken);
        const currentTime = Date.now() / 1000;

        if (currentTime <= decodedRefreshToken.exp) {
          const config = {
            headers: {
              Authorization: `Bearer ${refToken}`,
            },
          };
          const response = await axios.post("https://e-commerce-project-backend-yec6.onrender.com/v1/customers/refresh/token", {}, config);
          const { access_token } = response.data;
          setAuthToken(access_token);
          localStorage.setItem("token", access_token);
        } else {
          logoutHandler();
          return;
        }
      }
    } catch (error) {
      logoutHandler();
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authToken) {
        const decoded = decodeJwt(authToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && currentTime > decoded.exp) {
          await refreshAccessToken();
        } else {
          loginHandler(authToken, refToken);
          const storedCustomerid = localStorage.getItem("customerId");
          try {
            const response = await axios.get(`https://e-commerce-project-backend-yec6.onrender.com/v1/customers/${storedCustomerid}`);
            const customerData = response.data;
            setCustomerImage(customerData.customer_image || null);
          } catch (error) {
            console.error("Error fetching user image:", error);
          }
        }
      } else {
        logoutHandler();
      }
    };
  
    checkAuthentication()
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        refresh: refToken,
        customerImage: customerImage,
        login: loginHandler,
        logout: logoutHandler,
        setCustomerImage: setCustomerImageHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
