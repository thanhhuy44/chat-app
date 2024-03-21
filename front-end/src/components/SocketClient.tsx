"use client";

import socket from "@/utils/socket";
import { useSession } from "next-auth/react";
import React, { ReactNode, Fragment, useEffect } from "react";

export default function SocketClient({ children }: { children: ReactNode }) {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      socket.connect();
      socket.emit("online", data.user._id);
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    } else {
      socket.disconnect();
    }
  }, [status]);

  return <Fragment>{children}</Fragment>;
}
