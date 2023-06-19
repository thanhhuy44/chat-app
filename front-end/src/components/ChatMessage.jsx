import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

function ChatMessage({ messages }) {
  const listMessageRef = useRef(null);
  const user = useSelector((state) => state.chat.authInfo);

  useEffect(() => {
    listMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <div ref={listMessageRef} className="flex flex-col gap-y-2 min-h-full py-2">
      {messages?.map((message, index) => (
        <Message
          key={index}
          isSender={user?._id === message?.sender}
          text={message?.text}
        />
      ))}
    </div>
  );
}

export default ChatMessage;
