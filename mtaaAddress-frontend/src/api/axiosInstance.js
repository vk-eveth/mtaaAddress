import axios from "axios";

const baseURL = "http://localhost:8001";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 (Unauthorized) and the request has not been retried yet
    // and a refresh token exists, attempt to refresh the access token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: localStorage.getItem("refresh"),
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        // Refresh token invalid
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // force logout
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
