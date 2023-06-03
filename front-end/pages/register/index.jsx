import Image from 'next/image';
import logo from '../../assets/images/logo.png';
import { Eye, EyeSlash, Warning } from '@phosphor-icons/react';
import { useState } from 'react';
import { notification } from 'antd';
import request from '../../utils/axios';
import { useRouter } from 'next/router';

function Register() {
  const [hidePassword, setHidePassword] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [api, contextHolder] = notification.useNotification();
  const { replace } = useRouter();

  const handleSubmit = () => {
    const formData = [
      firstName,
      lastName,
      phoneNumber,
      email,
      userName,
      password,
    ];

    const validate = formData.every((field) => {
      if (field === '') {
        return false;
      } else {
        return true;
      }
    });

    const validateEmail = /^\S+@\S+\.\S+$/.test(email);
    const validatePhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
      phoneNumber
    );
    const validateUserName = userName.length >= 6;
    const validatePassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    !validate &&
      api.open({
        message: 'Notification',
        description: 'Please complete all information!',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });
    validate &&
      !validatePhone &&
      api.open({
        message: 'Notification',
        description: 'Please enter the correct phone number!',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });
    validate &&
      !validateEmail &&
      api.open({
        message: 'Notification',
        description: 'Please enter the correct email!',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });

    validate &&
      !validateUserName &&
      api.open({
        message: 'Notification',
        description: 'Username must be at least 6 characters',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });
    validate &&
      !validatePassword &&
      api.open({
        message: 'Notification',
        description:
          'Password must be at least 8 characters long, including at least one number, one uppercase letter and one special character.',
        icon: <Warning style={{ color: '#108ee9' }} />,
      });
    if (validate && validateEmail && validatePhone && validatePassword) {
      request
        .post('/user/register', {
          firstName,
          lastName,
          phoneNumber,
          email,
          userName,
          password,
        })
        .then((response) => {
          if (response.errCode === 0) {
            api.open({
              message: <h1 className="text-blue-500">Notification</h1>,
              description: 'Register successfully!',
              icon: <Warning style={{ color: '#108ee9' }} />,
            });
            setTimeout(() => {
              replace('/login');
            }, 3000);
          } else {
            api.open({
              message: 'Notification',
              description: `${response.message}`,
              icon: <Warning style={{ color: '#108ee9' }} />,
            });
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      {contextHolder}
      <div className="min-w-[768px]  max-w-[1024px] mx-auto bg-primary-5 py-4 px-8 rounded-xl">
        <div className="flex justify-center gap-x-4">
          <Image src={logo} alt="logo" />
        </div>
        <h1 className="mt-4 text-center uppercase font-bold text-3xl text-primary-2">
          Register
        </h1>
        <div className="mt-8 flex flex-col w-full gap-y-4">
          <div className="grid grid-cols-2 gap-x-8">
            <div className="block w-full">
              <label
                className="block px-4 py-1 text-lg text-primary-1"
                htmlFor="firstName">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                id="firstName"
                className="block p-4 w-full rounded-lg focus:outline-none bg-primary-4 text-primary-1 font-medium text-lg"
              />
            </div>
            <div className="block w-full">
              <label
                className="block px-4 py-1 text-lg text-primary-1"
                htmlFor="lastName">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                id="lastName"
                className="block p-4 w-full rounded-lg focus:outline-none bg-primary-4 text-primary-1 font-medium text-lg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="block w-full">
              <label
                className="block px-4 py-1 text-lg text-primary-1"
                htmlFor="phoneNumber">
                Phone
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="tel"
                id="phoneNumber"
                className="block p-4 w-full rounded-lg focus:outline-none bg-primary-4 text-primary-1 font-medium text-lg"
              />
            </div>
            <div className="block w-full">
              <label
                className="block px-4 py-1 text-lg text-primary-1"
                htmlFor="email">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                className="block p-4 w-full rounded-lg focus:outline-none bg-primary-4 text-primary-1 font-medium text-lg"
              />
            </div>
          </div>
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
          <div className="mt-4 flex w-full justify-center">
            <button
              onClick={handleSubmit}
              className="min-w-[300px] px-12 py-4 rounded-lg bg-primary-1 uppercase text-primary-4 text-xl font-medium">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
