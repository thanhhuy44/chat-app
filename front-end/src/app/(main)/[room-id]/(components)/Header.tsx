"use client";

import { ApiResponse, User } from "@/types";
import { ETypeChat } from "@/types/enum";
import { findGuestUsers } from "@/utils";
import createCustomFetch from "@/utils/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const { data } = useSession();
  const [guests, setGuests] = useState<User | User[]>();
  const [typeChat, setTypeChat] = useState<ETypeChat>();
  const params = useParams();
  const roomId = params["room-id"];

  const getRoomInfo = async () => {
    const fetch = await createCustomFetch({
      method: "GET",
    });
    const response: ApiResponse = await fetch("/rooms/info/" + roomId);
    if (response.statusCode === 200) {
      setTypeChat(response.data.type as ETypeChat);
      const members = response.data?.members as User[];
      setGuests(
        findGuestUsers(
          data?.user._id as string,
          members,
          response.data.type as ETypeChat,
        ),
      );
    }
  };

  useEffect(() => {
    getRoomInfo();
  }, [roomId]);

  return (
    <div className="border-b border-gray-300">
      <div className="container">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-x-4 py-2">
          <div>
            <Image
              width={52}
              height={52}
              src={typeChat === ETypeChat.SINGLE ? (guests as User).avatar : ""}
              className="aspect-square rounded-full object-cover object-center"
              alt={
                typeChat === ETypeChat.SINGLE ? (guests as User).fullName : ""
              }
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold">
              {typeChat === ETypeChat.SINGLE ? (guests as User)?.fullName : ""}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
