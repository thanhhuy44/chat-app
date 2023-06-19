import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import conversationApi from "../api/conversation";
import { toast } from "react-toastify";
import { CircleNotch } from "@phosphor-icons/react";
import socket from "../socket";

function ChatHistory() {
  const isLogin = useSelector((state) => state.chat.isLogin);
  const user = useSelector((state) => state.chat.authInfo);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getConversations = async () => {
    const response = await conversationApi.getall(user._id);
    if (response.type === "success") {
      if (response.data?.errCode === 0) {
        setConversations(response.data?.data);
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    } else {
      toast.error("Something went wrong, please try again later!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getConversations();

    socket.on("updated-conversations", async () => {
      if (isLogin) {
        const response = await conversationApi.getall(user._id);
        if (response.type === "success") {
          if (response.data?.errCode === 0) {
            setConversations(response.data?.data);
          } else {
            toast.error("Something went wrong, please try again later!");
          }
        } else {
          toast.error("Something went wrong, please try again later!");
        }
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-2 min-h-full">
      {isLoading ? (
        <CircleNotch
          size={32}
          weight="bold"
          className="text-primary-1 m-auto animate-spin"
        />
      ) : conversations.length > 0 ? (
        conversations.map((conversation) => (
          <ContactItem key={conversation._id} data={conversation} />
        ))
      ) : (
        <p>Haven't conversation yet</p>
      )}
    </div>
  );
}

export default ChatHistory;
