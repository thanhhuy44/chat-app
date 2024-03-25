"use client";

import socket from "@/utils/socket";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { ReactNode, Fragment, useEffect } from "react";

export default function SocketClient({ children }: { children: ReactNode }) {
  const { status, data } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      socket.connect();
      socket.emit("online", data.user._id);
      socket.on("connect_error", (err) => {
        socket.connect();
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [status, pathname]);

  return <Fragment>{children}</Fragment>;
}
