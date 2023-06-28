import { useEffect, useState } from "react";
import conversationApi from "../api/conversation";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import ChatMessage from "../components/ChatMessage";
import chatApi from "../api/chat";
import socket from "../socket";
import { useSelector } from "react-redux";

function ChatRoom() {
  const user = useSelector((state) => state.chat.authInfo);
  const location = useLocation();
  const [data, setData] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [guestUser, setGuestUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = async () => {
    const response = await conversationApi.getDetail(location.state.id);
    if (response.type === "success") {
      if (response.data.errCode === 0) {
        setData(response.data?.data);
        console.log(
          "🚀 ~ file: ChatRoom.jsx:28 ~ handleGetData ~ response.data?.data):",
          response.data?.data.members
        );
        response.data?.data.members.forEach((mem, index) => {
          if (mem._id !== user._id) {
            setGuestUser(mem);
          }
        });
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    } else {
      toast.error("Something went wrong, please try again later!");
    }
  };

  const handleGetMessages = async () => {
    const response = await chatApi.getAllMessages(location.state?.id);
    if (response.data?.errCode === 0) {
      setMessages(response.data?.data);
    }
  };

  const handleSendMessages = () => {
    const receiver = data?.members.filter((member) => member._id !== user._id);
    const form = {
      conversation: location.state?.id || null,
      text: messageText,
      sender: user._id,
      receiver: receiver[0]._id,
    };
    socket.emit("send-message", form);
  };

  useEffect(() => {
    handleGetData();
    handleGetMessages();
    socket.emit("join_conversation", location.state?.id);
    socket.on("received_message", (message) => {
      if (message.errCode === 0) {
        setMessages((prevMessages) => [...prevMessages, message?.data]);
        setMessageText("");
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    });
    return () => {
      console.log("====================================");
      console.log("hihihi");
      console.log("====================================");
    };
  }, [location.state?.id]);

  return (
    <div className="flex flex-col w-full h-full bg-primary-5 rounded-lg overflow-hidden">
      <div className="pb-4">
        <ChatHeader data={guestUser} />
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto px-4">
          <ChatMessage messages={messages} />
        </div>
      </div>
      <ChatFooter
        onSubmit={handleSendMessages}
        message={messageText}
        setMessage={setMessageText}
      />
    </div>
  );
}

export default ChatRoom;
