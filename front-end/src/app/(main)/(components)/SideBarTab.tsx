"use client";
import React, { useState } from "react";
import { Chats, Users } from "@phosphor-icons/react/dist/ssr";
import ChatHistory from "./ChatHistory";
import ListUser from "./ListUser";
import QueryProvider from "@/components/QueryProvider";

export default function SidebarTab() {
  const [tabActive, setTabActive] = useState<"chat" | "user">("chat");

  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setTabActive("chat")}
          className={`flex items-center justify-center border-b py-2 duration-300 active:bg-gray-200 ${tabActive === "chat" ? "border-gray-300 opacity-100" : "border-transparent opacity-60"}`}
        >
          <Chats size={24} />
        </button>
        <button
          onClick={() => setTabActive("user")}
          className={`flex items-center justify-center border-b py-2 duration-300 active:bg-gray-200 ${tabActive === "user" ? "border-gray-300 opacity-100" : "border-transparent opacity-60"}`}
        >
          <Users size={24} />
        </button>
      </div>
      <div className="relative flex-1">
        {tabActive === "chat" ? (
          <QueryProvider>
            <ChatHistory />
          </QueryProvider>
        ) : null}
        {tabActive === "user" ? (
          <QueryProvider>
            <ListUser />
          </QueryProvider>
        ) : null}
      </div>
    </div>
  );
}
