import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import avatar from "../assets/images/user.png";
import Message from "./Message";
import request from "../utils/axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function ChatRoom() {
  const router = useRouter();
  const messageContentRef = useRef(null);
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const isLogin = useSelector((state) => state.chatApp.isLogin);
  const currUser = useSelector((state) => state.chatApp.currUser);

  useEffect(() => {
    if (isLogin && router.isReady) {
      request
        .get(`/conversations/detail/${router.query.slug}`)
        .then((response) => {
          setData(response.data);
          setMessages(response.data.messages);
        });
    }
  }, [router.isReady]);

  useEffect(() => {
    const socket = io("http://localhost:3030");
    socket.on("received-message", (messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    messageContentRef.current.scrollTop =
      messageContentRef.current.scrollHeight;
  }, [messages.length]);

  const handleSendMessage = () => {
    const socket = io("http://localhost:3030");
    socket.emit("send-message", {
      conversation: router.query.slug,
      sender: currUser._id,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="absolute top-4 right-0 left-4 h-full rounded-xl bg-primary-5 overflow-hidden flex flex-col justify-between">
      {data && (
        <>
          <div className="flex items-center gap-x-4 py-4 px-8 bg-primary-3">
            <div className="relative aspect-square">
              <div className="block w-12 h-12 aspect-square">
                <Image
                  className="block w-10 aspect-square rounded-full"
                  src={avatar}
                  alt="avatar"
                />
              </div>
              <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500"></div>
            </div>
            <div>
              <h4 className="font-semibold text-4xl leading-[48px] text-primary-1">
                User Name 1
              </h4>
              <p>Online</p>
            </div>
          </div>
          <div
            ref={messageContentRef}
            className="px-8 my-4 flex-1 flex flex-col gap-y-2 overflow-auto"
          >
            {messages?.map((message) => (
              <Message
                key={message._id}
                text={message.text}
                isSender={message.sender === currUser._id ? true : false}
              />
            ))}
          </div>
          <div className="flex items-center gap-x-2 mx-8 my-4 p-4 bg-primary-3 rounded-xl">
            <input
              className="flex-1 block bg-transparent focus:outline-none font-medium text-primary-1"
              type="text"
              placeholder="Viết tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div onClick={handleSendMessage}>Send</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatRoom;
