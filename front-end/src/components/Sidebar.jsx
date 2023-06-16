import { useState } from "react";
import { ChatsCircle, Users } from "@phosphor-icons/react";
import ListUser from "./ListUser";
import ChatHistory from "./ChatHistory";

function Sidebar() {
  const [typeSidebar, setTypeSidebar] = useState("history");

  return (
    <div className="relative h-full flex flex-col gap-y-2 overflow-y-auto bg-primary-5 rounded-lg">
      <div className="grid grid-cols-2 bg-primary-5 z-[1] border-b border-black">
        <div
          onClick={() => {
            setTypeSidebar("history");
          }}
          className={`flex w-full items-center justify-center py-2 border-b-4 bg-transparent duration-200 ${
            typeSidebar === "history"
              ? "border-b-primary-1 text-primary-1 cursor-text"
              : "border-transparent text-black cursor-pointer hover:bg-primary-3"
          }`}
        >
          <ChatsCircle size={32} weight="bold" />
        </div>
        <div
          onClick={() => {
            setTypeSidebar("users");
          }}
          className={`flex w-full items-center justify-center py-2 border-b-4 bg-transparent duration-200 ${
            typeSidebar === "users"
              ? "border-b-primary-1 text-primary-1 cursor-text"
              : "border-transparent text-black cursor-pointer hover:bg-primary-3"
          }`}
        >
          <Users size={32} weight="bold" />
        </div>
      </div>
      <div className="mt-10 px-4 absolute top-8 left-0 right-0 bottom-4 overflow-y-auto bg-primary-5 ">
        {typeSidebar === "history" && <ChatHistory />}
        {typeSidebar === "users" && <ListUser />}
      </div>
    </div>
  );
}

export default Sidebar;
