import { useEffect, useState } from 'react';
import ContactItem from './ContactItem';
import request from '../utils/axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function Sidebar() {
  const isLogin = useSelector((state) => state.chatApp.isLogin);

  const [users, setUser] = useState([]);
  const token = Cookies.get('token');

  const handleGetUser = async () => {
    request.defaults.headers = {
      'x-access-token': token,
    };
    await request.get('/users').then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    // handleGetUser();
    console.log(isLogin);
  }, []);

  return (
    <div className=" bg-primary-5 flex flex-col w-full gap-y-1 ">
      {users.map((user) => (
        <ContactItem key={user._id} />
      ))}
    </div>
  );
}

export default Sidebar;
