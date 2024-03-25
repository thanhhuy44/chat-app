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
    <div className="mx-auto max-w-5xl py-6">
      <div className="flex h-full flex-col-reverse justify-end gap-y-2">
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            {...message}
            isSender={data?.user._id === message?.sender?._id}
          />
        ))}
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
}
