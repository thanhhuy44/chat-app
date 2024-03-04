import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: "https://chat-app-delta-neon.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(function (config) {
  const token = Cookies.get("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

export default request;
