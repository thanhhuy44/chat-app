"use client";

import { SignOut } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import SideBarTab from "./SideBarTab";
import socket from "@/utils/socket";

export default function SideBar() {
  const { data } = useSession();

  return (
    <div className="flex h-full w-full max-w-[250px] flex-col border-r border-gray-300">
      <div className="border-b border-gray-300 py-4">
        <h1 className="text-center">App Name</h1>
      </div>
      <div className="flex-1">
        <SideBarTab />
      </div>
      <div className="border-t border-gray-300 bg-gray-100">
        <button
          onClick={() => {
            socket.emit("offline", data?.user._id);
            socket.disconnect();
            signOut({
              redirect: true,
              callbackUrl: "/login",
            });
          }}
          className="flex w-full items-center justify-center gap-x-3 py-4"
        >
          <SignOut />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
}
