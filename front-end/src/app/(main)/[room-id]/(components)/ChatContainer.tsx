"use client";
import React, { useEffect, useState } from "react";
import ListMessage from "./ListMessage";
import InputChat from "./InputChat";
import Scrollable from "@/components/Scrollable";
import createCustomFetch from "@/utils/client";
import { ApiResponse, Message } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EMessage } from "@/types/enum";

export default function ChatContainer({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("🚀 ~ ChatContainer ~ messages:", messages);

  const sendMessages = async (message: string) => {
    const fetch = await createCustomFetch({
      method: "POST",
    });

    const response = await fetch("/messages/" + roomId, {
      text: message,
      type: EMessage.Text,
      room: roomId,
    });
    console.log("🚀 ~ sendMessages ~ response:", response);
  };

  const getMessages = async ({ pageParam }: { pageParam: number }) => {
    const fetch = await createCustomFetch({
      method: "GET",
    });

    const response = await fetch("/messages/" + roomId + "?page=" + pageParam);
    console.log("🚀 ~ getMessages ~ response:", response);
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
  console.log(
    "🚀 ~ ChatContainer ~ data:",
    data?.pages.map((page) => {
      console.log("page.data: ", page.data);
    }),
  );

  useEffect(() => {
    data?.pages.forEach((page) => {
      setMessages((prev) => [...prev, ...page.data]);
    });
  }, [data]);

  return (
    <div className="flex h-full flex-col">
      <Scrollable>
        <div className="container flex-1">
          <ListMessage />
        </div>
      </Scrollable>
      <InputChat
        onSend={(message) => {
          sendMessages(message);
        }}
      />
    </div>
  );
}
