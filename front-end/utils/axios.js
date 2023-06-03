import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') ? Cookies.get('token') : '';
const refreshToken = Cookies.get('refreshToken')
  ? Cookies.get('refreshToken')
  : '';

const request = axios.create({
  baseURL: `http://localhost:3030/api`,
  headers: {
    'x-access-refresh-token': refreshToken,
    'x-access-token': token,
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
