import { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import request from "../utils/axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { getSocket } from "../utils/socket";

function Sidebar() {
  const socket = getSocket();
  const isLogin = useSelector((state) => state.chatApp.isLogin);
  const currUser = useSelector((state) => state.chatApp.currUser);
  const [conversations, setConversations] = useState([]);
  const token = Cookies.get("token");

  const handleGetUser = async () => {
    await request.get(`/conversations/${currUser?._id}`).then((response) => {
      setConversations(response.data);
    });
  };

  useEffect(() => {
    handleGetUser();
    socket?.on("updated-conversations", (conversations) => {
      setConversations(conversations);
    });
  }, []);

  return (
    <div className="min-h-full py-4 px-2 flex flex-col w-full gap-y-2 ">
      {conversations.map((conversation) => (
        <ContactItem key={conversation?._id} conversation={conversation} />
      ))}
    </div>
  );
}

export default Sidebar;
