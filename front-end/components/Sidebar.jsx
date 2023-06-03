import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import request from "../utils/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Sidebar() {
  const isLogin = useSelector((state) => state.chatApp.isLogin);

  const [users, setUser] = useState([]);
  const token = Cookies.get("token");

  const handleGetUser = async () => {
    await request.get("/users").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    handleGetUser();
    console.log(isLogin);
  }, []);

  return (
    <div className="min-h-full py-4 px-2 flex flex-col w-full gap-y-2 ">
      {users.map((user) => (
        <ContactItem key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Sidebar;
