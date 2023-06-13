import { UserCircle, PaperPlaneRight } from "@phosphor-icons/react";

function Chat() {
  return (
    <div className="flex flex-col w-full h-full bg-primary-5 rounded-lg overflow-hidden">
      <div className="flex items-center gap-x-2 p-4 bg-primary-3">
        <div className="w-14 aspect-square relative">
          <UserCircle size={56} />
          <span className="absolute right-1 bottom-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
        <div>
          <p className="text-2xl font-medium text-primary-1 left-5">
            thanhhuy44
          </p>
          <p className="text-sm">Online</p>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto p-4">
          <div className="block bg-sky-100 min-h-full"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="py-2 flex w-full items-center gap-x-2 bg-primary-2 px-4 rounded-lg focus-within:shadow-xl">
          <input className="block flex-1 py-2 focus:outline-none bg-transparent" />
          <div className="cursor-pointer text-primary-5 hover:text-primary-4 duration-150">
            <PaperPlaneRight weight="fill" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
