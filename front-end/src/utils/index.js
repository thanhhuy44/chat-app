import axios from "axios";

const request = axios.create({
  baseURL: `http://localhost:3030/api`,
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
