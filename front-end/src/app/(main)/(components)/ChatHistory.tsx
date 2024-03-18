"use client";

import createCustomFetch from "@/utils/client";
import { CircleNotch } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ChatHistory() {
  const [loading, setLoading] = useState<boolean>(true);
  const { data, status } = useSession();

  const getRooms = async () => {
    const customfetch = createCustomFetch({
      method: "GET",
      auth: data?.user.token,
    });
    const response = await customfetch("/users");
    console.log("🚀 ~ getRooms ~ response:", response);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getRooms();
    }
  }, [status]);

  return loading ? (
    <div className="flex h-full items-center justify-center">
      <CircleNotch className="animate-spin" size={24} />
    </div>
  ) : (
    <div>Chat History</div>
  );
}
