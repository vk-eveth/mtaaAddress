import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext"; // so we get token

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { auth, logoutUser } = useContext(AuthContext);

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch current user's addresses
    const fetchMyAddresses = async () => {
      if (!auth?.access) return; // no token, no fetch

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get("http://127.0.0.1:8001/api/addresses/my/", {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        });
        setAddresses(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          // Token expired or invalid
          logoutUser();
        } else {
          setError("Failed to fetch addresses.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // Create a new address
    const createAddress = async (addressData) => {
      if (!auth?.access) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.post(
          "http://127.0.0.1:8001/api/addresses/create/",
          addressData,
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
              "Content-Type": "application/json",
            },
          }
        );
        // Add new address to state list
        setAddresses((prev) => [res.data, ...prev]);
        return res.data;
      } catch (err) {
        if (err.response?.status === 401) {
          logoutUser();
        } else {
          setError("Failed to create address.");
          console.error(err);
        }
        return null;
      } finally {
        setLoading(false);
      }
    };

    // On mount, fetch addresses
    useEffect(() => {
      fetchMyAddresses();
    }, [auth?.access]);

    useEffect(() => {
    if (!auth?.access) return; // wait for auth to be ready

    const fetchAddresses = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8001/api/addresses/my/", {
          headers: { Authorization: `Bearer ${auth.access}` },
        });
        setAddresses(res.data);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };

    fetchAddresses();
  }, [auth]);

  const deleteAddress = async (id) => {
    if (!auth?.access) return false;
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8001/api/addresses/${id}/delete/`, {
        headers: { Authorization: `Bearer ${auth.access}` },
      });
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      console.error("Delete failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id, updateFields) => {
    if (!auth?.access) return null;
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8001/api/addresses/${id}/update/`,
        updateFields,
        { headers: { Authorization: `Bearer ${auth.access}` } }
      );
      setAddresses((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
      return res.data;
    } catch (err) {
      console.error("Update failed:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        error,
        fetchMyAddresses,
        createAddress,
        deleteAddress,
        updateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
