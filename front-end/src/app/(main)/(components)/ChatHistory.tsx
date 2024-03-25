"use client";

import React, { Fragment } from "react";
import Scrollable from "@/components/Scrollable";
import { Room, User } from "@/types";
import createCustomFetch from "@/utils/client";
import { CircleNotch } from "@phosphor-icons/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import socket from "@/utils/socket";
dayjs.extend(relativeTime);

export default function ChatHistory() {
  const session = useSession();

  const getRooms = async () => {
    const customfetch = await createCustomFetch({
      method: "GET",
    });
    return await customfetch("/rooms");
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
    queryFn: getRooms,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.page >= lastPage.pagination.totalPage
        ? undefined
        : lastPage.pagination.page + 1;
    },
  });

  return isFetching ? (
    <div className="flex h-full items-center justify-center">
      <CircleNotch className="animate-spin" size={24} />
    </div>
  ) : (
    <Scrollable
      onScrollEnd={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      {data?.pages[0].data.length ? (
        data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.data.map((room: Room) => {
              const user = room.members?.find(
                (e) => e._id !== session.data?.user._id,
              ) as User;
              const isRead = room.lastMessage?.seenBy.includes(
                session.data?.user._id as string,
              );
              return user ? (
                <Link
                  href={`/${room._id}`}
                  key={user._id}
                  className="flex cursor-pointer select-none items-center gap-x-2 px-3 py-2 duration-150 hover:bg-gray-200 active:bg-gray-300"
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={user.avatar}
                      alt={user.avatar}
                      width={40}
                      height={40}
                      className="aspect-square rounded-full object-cover object-center"
                    />
                    {user.isOnline ? (
                      <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                      <p className="line-clamp-1 flex-1 text-sm font-semibold">
                        {user.fullName}
                      </p>
                      <p className="text-xs font-light">
                        {dayjs(room.updatedAt).fromNow()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <p
                        className={`line-clamp-1 flex-1 text-xs ${!isRead ? "font-semibold" : ""}`}
                      >
                        {(room.lastMessage?.sender as string) ===
                        session.data?.user._id
                          ? "You: "
                          : null}
                        {room.lastMessage?.text}
                      </p>
                      {!isRead ? (
                        <span className="h-2 w-2 rounded-full bg-gray-950"></span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ) : null;
            })}
          </Fragment>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="select-none text-xs text-gray-400">Empty!</p>
        </div>
      )}
      {isFetchingNextPage ? (
        <div className="flex items-center justify-center py-4">
          <CircleNotch className="animate-spin" size={24} />
        </div>
      ) : null}
    </Scrollable>
  );
}
