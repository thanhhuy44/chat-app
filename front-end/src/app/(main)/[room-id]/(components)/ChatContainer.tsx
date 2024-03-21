"use client";
import React, { useEffect, useState } from "react";
import ListMessage from "./ListMessage";
import InputChat from "./InputChat";
import Scrollable from "@/components/Scrollable";
import createCustomFetch from "@/utils/client";
import { ApiResponse, Message, User } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EMessage } from "@/types/enum";
import { useSession } from "next-auth/react";
import socket from "@/utils/socket";

export default function ChatContainer({ roomId }: { roomId: string }) {
  const session = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessages = async (message: string) => {
    // const fetch = await createCustomFetch({
    //   method: "POST",
    // });

    // const response = await fetch("/messages/" + roomId, {
    //   text: message,
    //   type: EMessage.Text,
    //   room: roomId,
    // });
    if (socket.connected) {
      socket.emit("send-message", {
        text: message,
        type: EMessage.Text,
        room: roomId,
        sender: session.data?.user._id,
      });
    }
    // console.log("🚀 ~ sendMessages ~ response:", response);
  };

  const getMessages = async ({ pageParam }: { pageParam: number }) => {
    const fetch = await createCustomFetch({
      method: "GET",
    });

    const response = await fetch("/messages/" + roomId + "?page=" + pageParam);
    return response;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["page"],
    queryFn: getMessages,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.page >= lastPage.pagination.totalPage
        ? undefined
        : lastPage.pagination.page + 1;
    },
  });

  useEffect(() => {
    data?.pages.forEach((page) => {
      setMessages((prev) => [...prev, ...page.data]);
    });
  }, [data]);

  useEffect(() => {
    if (socket.connected) {
      socket.emit("join-room", roomId); //join room

      //on new message in room coming (not my message)
      socket.on("received-message", (message) => {
        // console.log("🚀 ~ socket.on ~ message:", message);
        // if (message.room === roomId) {
        //   setMessages((prev) => [...prev, message]);
        // }

        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.emit("leave-room", roomId); //join room
    };
  }, [roomId]);

  return (
    <div className="flex h-full flex-col">
      <Scrollable onScrollTop={fetchNextPage}>
        <div className="container flex-1">
          <ListMessage messages={messages} />
        </div>
      </Scrollable>
      <InputChat
        disable={isFetchingNextPage}
        onSend={(message) => {
          sendMessages(message);
        }}
      />
    </div>
  );
}
