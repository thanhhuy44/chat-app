import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ChatRoom from "../../components/ChatRoom";

function Chat() {
  return (
    <div className="rounded-lg overflow-hidden bg-primary-4 max-w-[1024px] h-screen mx-auto fixed top-0 right-0 left-0 bottom-0">
      <div className="fixed top-0 w-full max-w-[1024px] mx-auto z-10">
        <Header />
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 mt-20 grid grid-cols-10 overflow-hidden">
        <div className="relative col-span-3 block min-h-full bg-slate-50 overflow-y-auto">
          <Sidebar />
        </div>
        <div className="relative col-span-7 mb-8">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}

export default Chat;
