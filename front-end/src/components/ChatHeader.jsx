import { UserCircle } from "@phosphor-icons/react";

function ChatHeader({ data }) {
  return (
    <div className="flex items-center gap-x-2 p-4 bg-primary-3">
      <div className="w-14 aspect-square relative">
        <UserCircle size={56} />
        {data?.isOnline && (
          <span className="absolute right-1 bottom-1 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </div>
      <div>
        <p className="text-2xl font-medium text-primary-1 left-5">
          {data?.userName}
        </p>
        <p className="text-sm">{data?.isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
}

export default ChatHeader;
