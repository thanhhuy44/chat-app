import { useState } from "react";
import Image from "next/image";
import avatar from "../assets/images/user.png";
import Message from "./Message";
import io from "socket.io-client";

function ChatRoom() {
  const [message, setMessages] = useState("");

  const handleSendMessage = () => {
    console.log(message);
  };

  return (
    <div className="absolute top-4 right-0 left-4 h-full rounded-xl bg-primary-5 overflow-hidden flex flex-col justify-between">
      <div className="flex items-center gap-x-4 py-4 px-8 bg-primary-3">
        <div className="relative aspect-square">
          <Image
            className="block w-20 aspect-square rounded-full"
            src={avatar}
            alt="avatar"
          />
          <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500"></div>
        </div>
        <div>
          <h4 className="font-semibold text-4xl leading-[48px] text-primary-1">
            User Name 1
          </h4>
          <p>Online</p>
        </div>
      </div>
      <div className="px-8 my-4 flex-1 flex flex-col-reverse gap-y-2 overflow-auto">
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={true}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={true}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={true}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
        <Message
          text={"This is Mess text hahfawfh heaf hai vcl tui se nhan tin voi "}
          isSender={false}
        />
      </div>
      <div className="flex items-center gap-x-2 mx-8 my-4 p-4 bg-primary-3 rounded-xl">
        <input
          className="flex-1 block bg-transparent focus:outline-none font-medium text-primary-1"
          type="text"
          placeholder="Viết tin nhắn..."
          onChange={(e) => setMessages(e.target.value)}
        />
        <div onClick={handleSendMessage}>Send</div>
      </div>
    </div>
  );
}

export default ChatRoom;
