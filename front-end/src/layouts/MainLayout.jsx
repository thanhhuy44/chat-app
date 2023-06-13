import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Mainlayout({ children }) {
  return (
    <div className="w-screen h-screen max-h-[100vh] overflow-hidden">
      <div className="h-full mx-auto flex flex-col w-full max-w-[1024px]">
        <div>
          <Header />
        </div>
        <div className="flex-1 flex w-full items-start h-full">
          <div className="flex-[3] h-full relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-y-auto bg-primary-5">
              <Sidebar />
            </div>
          </div>
          <div className="relative h-full flex-[7] ">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-4 p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainlayout;
