import { useEffect } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import request from '../utils/axios';
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const token = Cookies.get('token');
  const refreshToken = Cookies.get('refreshToken');

  // useEffect(() => {
  //   console.log(jwtDecode(token).exp < Date.now() / 1000);
  //   if (!token || !refreshToken) {
  //     router.replace('/login');
  //   } else if (jwtDecode(refreshToken).exp < Date.now() / 1000) {
  //     Cookies.remove('token');
  //     Cookies.remove('refreshToken');
  //   } else if (jwtDecode(token).exp < Date.now() / 1000) {
  //     request.post('/user/renew-token').then((response) => {
  //       console.log(response);
  //       Cookies.set('token', response.newToken);
  //       Cookies.set('refreshToken', response.newRefreshToken);
  //     });
  //   }
  // }, [router.pathname]);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
