"use client";

import { ApiResponse, User } from "@/types";
import { ETypeChat } from "@/types/enum";
import { findGuestUsers } from "@/utils";
import createCustomFetch from "@/utils/client";
import { useSession } from "next-auth/react";
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
        {typeChat === ETypeChat.SINGLE ? (guests as User)?.fullName : ""}
      </div>
    </div>
  );
}
