// src/context/UserContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    try {
      const res = await axios.get("http://127.0.0.1:8001/api/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  const updateUserProfile = async (data) => {
    const token = localStorage.getItem("access");
    try {
      const res = await axios.put("http://127.0.0.1:8001/api/users/me/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      return true;
    } catch (err) {
      console.error("Failed to update profile:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
