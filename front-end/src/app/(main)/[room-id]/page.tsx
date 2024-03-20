import React from "react";
import ChatContainer from "./(components)/ChatContainer";

export default function Page({ params }: { params: { "room-id": string } }) {
  return (
    <div className="flex-1">
      <ChatContainer roomId={params["room-id"]} />
    </div>
  );
}
