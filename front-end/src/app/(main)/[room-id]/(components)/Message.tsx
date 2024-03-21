"use client";

import { Message, User } from "@/types";
import Image from "next/image";
import React from "react";

interface Props extends Message {
  isSender?: boolean;
}

export default function Message({
  _id,
  sender,
  text,
  type,
  seenBy,
  isSender,
}: Props) {
  return (
    <div
      className={`flex w-full items-end gap-x-2 ${isSender ? "flex-row-reverse" : "flex-row justify-start"}`}
    >
      <div>
        <Image
          width={32}
          height={32}
          src={sender?.avatar}
          alt={sender?.fullName}
        />
      </div>
      <div
        className={`max-w-[60%] rounded-lg px-3 py-2 ${isSender ? "bg-gray-900 text-white" : "border border-gray-900"}`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
