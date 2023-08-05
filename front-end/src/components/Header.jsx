import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../assets/images/logo.png';
import { SignOut } from '@phosphor-icons/react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { setLogIn, setAuthInfo } from '../redux/features/chatSlice';
import socket from '../socket';
import { useEffect } from 'react';
import jwt from 'jwt-decode';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.chat.isLogin);
  const user = useSelector((state) => state.chat.authInfo);
  const token = Cookies.get('token');

  const handleLogout = async () => {
    navigate('/login');
    toast.success('Log out successfully!');
    socket.emit('logout', user._id);
    socket.close();
    dispatch(setAuthInfo(null));
    dispatch(setLogIn(false));
    Cookies.remove('token');
  };

  useEffect(() => {
    if (isLogin) {
      const decodedToken = jwt(token);
      console.log(decodedToken.exp);
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-between w-full px-8 py-2 bg-primary-5">
      <Link to={'/'}>
        <div className="flex items-center gap-x-2">
          <img src={Logo} alt="logo" className="h-[80px]" />
          <h1 className="text-3xl font-medium text-primary-1">Chat App</h1>
        </div>
      </Link>
      {isLogin ? (
        <div className="flex items-center gap-x-8 text-xl text-primary-1 ">
          <p>{user.userName}</p>
          <div
            onClick={handleLogout}
            className="flex items-center px-2 cursor-pointer bg-transparent hover:bg-primary-4 rounded-full hover:text-red-500 duration-200">
            <SignOut size={18} weight="bold" />
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-1 text-xl text-primary-1">
          <Link to={'/register'}>
            <p className="px-4">Register</p>
          </Link>
          <Link to={'/login'}>
            <p className="px-4">Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
