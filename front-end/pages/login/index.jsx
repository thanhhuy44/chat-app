import Image from 'next/image';
import logo from '../../assets/images/logo.png';
import { Eye, EyeSlash, Warning } from '@phosphor-icons/react';
import { useState } from 'react';
import { notification } from 'antd';
import request from '../../utils/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [api, contextHolder] = notification.useNotification();

  const handleLogin = () => {
    if (userName === '' || password === '') {
      api.open({
        message: 'Notification',
        description: 'Please complete all information!',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });
    } else {
      request
        .post('/user/login', {
          userName,
          password,
        })
        .then((response) => {
          if (response.errCode === 0) {
            api.open({
              message: <h1 className="text-blue-500">Notification</h1>,
              description: 'Login successfully!',
              icon: <Warning style={{ color: '#108ee9' }} />,
            });
            Cookies.set('token', response.token);
            Cookies.set('refreshToken', response.refreshToken);
            setTimeout(() => {
              router.replace('/');
            }, 3000);
          } else {
            api.open({
              message: 'Notification',
              description: response.message,
              icon: <Warning style={{ color: '#108ee9' }} />,
            });
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      {contextHolder}
      <div className="min-w-[368px]  max-w-[1024px] mx-auto bg-primary-5 py-4 px-8 rounded-xl">
        <div className="flex justify-center gap-x-4">
          <Image src={logo} alt="logo" />
        </div>
        <h1 className="mt-4 text-center uppercase font-bold text-3xl text-primary-2">
          Login
        </h1>
        <div className="mt-8 flex flex-col w-full gap-y-4">
          <div className="block w-full">
            <label
              className="block px-4 py-1 text-lg text-primary-1"
              htmlFor="userName">
              User Name
            </label>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              id="userName"
              className="block p-4 w-full rounded-lg focus:outline-none bg-primary-4 text-primary-1 font-medium text-lg"
            />
          </div>
          <div className="block w-full">
            <label
              className="block px-4 py-1 text-lg text-primary-1"
              htmlFor="password">
              Password
            </label>
            <div className="bg-primary-4 flex gap-x-2 flex-nowrap items-center p-4 w-full rounded-lg text-primary-1 font-medium text-lg">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={hidePassword ? 'password' : 'text'}
                id="password"
                className="focus:outline-none bg-transparent flex-1"
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setHidePassword(!hidePassword);
                }}>
                {hidePassword ? <Eye /> : <EyeSlash />}
              </div>
            </div>
          </div>
          <div className="my-4 flex w-full justify-center">
            <button
              onClick={handleLogin}
              className="min-w-[300px] px-12 py-4 rounded-lg bg-primary-1 uppercase text-primary-4 text-xl font-medium">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
