"use client";

import React, { useEffect, useState } from "react";
import createCustomFetch from "@/utils/client";
import { CircleNotch } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { ApiResponse, User } from "@/types";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ListUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<User>>([]);
  const { data, status } = useSession();

  const getRooms = async ({ pageParam }: { pageParam: number }) => {
    const customfetch = createCustomFetch({
      method: "GET",
      auth: data?.user.token,
    });
    // const response: ApiResponse = await customfetch("/users");
    // if (response.data?.length) {
    //   setUsers(response.data);
    //   setLoading(false);
    // }
    const response = await fetch("/api/users");
    console.log("🚀 ~ getRooms ~ response:", response);
  };

  const { error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["page"],
      queryFn: getRooms,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => lastPage as any,
    });

  return loading ? (
    <div className="flex h-full items-center justify-center">
      <CircleNotch className="animate-spin" size={24} />
    </div>
  ) : (
    <div>
      {users.map((user) => (
        <div
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
          <div>
            <p className="text-sm font-semibold">{user.fullName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
