"use client";

import { Message, User } from "@/types";
import React, { useEffect, useRef } from "react";
import MessageItem from "./Message";
import { useSession } from "next-auth/react";

interface Props {
  messages: Array<Message>;
}

export default function ListMessage({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useSession();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col justify-end gap-y-2 py-6">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          {...message}
          isSender={data?.user._id === message?.sender?._id}
        />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
