import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleNotch, User } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import ChatFooter from "../components/ChatFooter";
import userApi from "../api/user";
import socket from "../socket";

function Chat() {
  const user = useSelector((state) => state.chat.authInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const [guestUser, setGuestUser] = useState();
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");

  const handleGetData = async () => {
    const response = await userApi.getDetail(location.state.guestId);
    if (response.data.errCode === 1 || response.type === "error") {
      toast.error("Error!");
      navigate("/");
    } else {
      if (response.data?.data?.conversation) {
        let conversationId = response.data?.data?.conversation?._id;
        navigate(`/conversations/${conversationId}`, {
          state: {
            id: conversationId,
          },
        });
      } else {
        setGuestUser(response.data?.data?.user);
        setLoading(false);
      }
    }
  };

  const handleSendMessages = () => {
    const receiver = location.state.guestId;
    const form = {
      text: messageText,
      sender: user._id,
      receiver: receiver,
    };
    socket.emit("send-message-new", form);
  };

  useEffect(() => {
    handleGetData();
    socket.on("update-message-new", (message) => {
      if (message.errCode === 0) {
        navigate(`/conversations/${message?.data?.conversation}`, {
          state: {
            id: message?.data?.conversation,
          },
        });
        setMessageText("");
      } else {
        toast.error("Something went wrong, please try again later!");
      }
    });
    return () => {
      setGuestUser(null);
      setLoading(true);
      socket.off("update-message-new");
    };
  }, [location.state]);

  return (
    <div className="flex flex-col w-full h-full bg-primary-5 rounded-lg overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center">
        {loading ? (
          <CircleNotch
            size={32}
            weight="bold"
            className="text-primary-1 animate-spin"
          />
        ) : (
          <div className="text-center flex flex-col gap-y-4 items-center">
            <User size={64} />
            <p className="text-2xl font-medium">{`${guestUser.firstName} ${guestUser.lastName}`}</p>
            <p className="text-primary-2 font-light ">
              ( {guestUser.userName} )
            </p>
          </div>
        )}
      </div>
      <ChatFooter
        onSubmit={handleSendMessages}
        message={messageText}
        setMessage={setMessageText}
      />
    </div>
  );
}

export default Chat;
