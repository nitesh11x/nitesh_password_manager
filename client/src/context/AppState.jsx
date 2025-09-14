import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const AppState = ({ children }) => {
  // const url = "http://localhost:1111/api";
  const url = "https://nitesh-password-manager.onrender.com/api";
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState();
  const [relod, setRelod] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState("");
  const [userPasswords, setUserPasswords] = useState([]);

  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const api = await axios.get(`${url}/password/get`, {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        });
        setUserPasswords(api.data.savedPassword.userData || []);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };
    if (isAuth) fetchPasswords();
  }, [isAuth, relod]);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuth(true);
      setToken(storedToken);
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  // Register user
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${url}/user/register`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, toastConfig);
        return res.data;
      } else {
        toast.error(res.data.message || "Registration failed", toastConfig);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast.error(message, toastConfig);
      console.error("Registration error:", error);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.success) {
        setUser(res.data.message);

        toast.success(res.data.message, toastConfig);
        setIsAuth(true);
        setToken(res.data.token);
        setUserId(res.data.userId);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        return res.data;
      } else {
        toast.error(res.data.message || "Login failed", toastConfig);
        return null;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast.error(message, toastConfig);
      console.error("Login error:", error);
      return null;
    }
  };

  // logout user
  const logout = async () => {
    setIsAuth(false);
    setUser(null); // optional, if you're storing user object
    setUserPasswords([]); // optional, if you're storing passwords in context

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.success("Logged out successfully"); // optional: redirect to home or login page
  };

  // addpassword
  const addPassword = async (siteName, siteUrl, password) => {
    try {
      const res = await axios.post(
        `${url}/password/add`,
        { siteName, siteUrl, password },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, toastConfig);
        return res.data;
      } else {
        toast.error(res.data.message || "Not Saved", toastConfig);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast.error(message, toastConfig);
      console.error("Failed:", error);
    }
  };

  // delete password
  // const deleteUserPassword = async (id) => {
  //     const confirm = window.confirm('Are you sure you want to delete this password?');
  //     if (!confirm) return;

  //     try {
  //         const res = await axios.delete(`${url}/password/delete/${id}`, {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 Auth: token,
  //             },
  //         });

  //         if (res.data.success) {
  //             toast.success('Password deleted successfully!');
  //             setRelod(Date.now()); // trigger reload
  //         } else {
  //             toast.error(res.data.message || 'Delete failed');
  //         }
  //     } catch (error) {
  //         const msg = error.response?.data?.message || 'Server error';
  //         toast.error(msg);
  //     }
  // };

  return (
    <AppContext.Provider
      value={{
        register,
        login,
        isAuth,
        setIsAuth,
        token,
        setToken,
        userId,
        setUserId,
        relod,
        setRelod,
        user,
        setUser,
        userPasswords,
        setUserPasswords,
        logout,
        addPassword,

        // deleteUserPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
