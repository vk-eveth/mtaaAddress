// src/context/AdminContext.js
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { auth, logoutUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    if (!auth?.access) return;

    try {
      const headers = {
        Authorization: `Bearer ${auth.access}`,
      };

      const [userRes, addressRes] = await Promise.all([
        axios.get("http://127.0.0.1:8001/api/addresses/admin/users/", { headers }),
        axios.get("http://127.0.0.1:8001/api/addresses/admin/all/", { headers }),
      ]);

      setUsers(userRes.data);
      setAddresses(addressRes.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
      if (err.response?.status === 401) logoutUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [auth?.access]);

  return (
    <AdminContext.Provider value={{ users, addresses, setAddresses, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
