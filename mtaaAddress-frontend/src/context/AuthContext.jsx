import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    const role = localStorage.getItem("role");
    return access ? { access, refresh, role } : null;
  });

  // LOGIN
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8001/api/users/login/", {
        email,
        password,
      });

      const { access, refresh, user } = res.data;
      const role = user.role;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", role);

      setAuth({ access, refresh, role });

      // Redirect based on role
      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    setAuth(null);
    navigate("/login");
  };

  // REGISTER + AUTO LOGIN
  const registerUser = async (name, email, password) => {
  try {
    await axios.post(
      "http://127.0.0.1:8001/api/users/register/",
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Auto-login after registration
    await loginUser(email, password);
  } catch (err) {
    console.error("Registration failed", err.response?.data || err.message);
    alert("Registration failed. Please try again.");
  }
};

  // AUTO REFRESH TOKEN
  const refreshAccessToken = async () => {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      logoutUser();
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8001/api/users/token/refresh/", {
        refresh,
      });

      const { access } = res.data;
      localStorage.setItem("access", access);
      setAuth((prev) => ({ ...prev, access }));
    } catch (err) {
      console.error("Failed to refresh access token", err);
      logoutUser();
    }
  };

  // Run token refresher every 4 mins
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
