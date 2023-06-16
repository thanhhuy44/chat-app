import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL: `http://localhost:3030/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") || "",
  },
});

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
