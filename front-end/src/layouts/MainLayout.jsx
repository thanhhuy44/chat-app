import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Mainlayout({ children }) {
  return (
    <div className="w-screen h-screen max-h-[100vh] overflow-hidden rounded-lg py-4">
      <div className="h-full mx-auto flex flex-col w-full max-w-[1024px] gap-y-4">
        <div className="rounded-lg overflow-hidden shadow-custom">
          <Header />
        </div>
        <div className="flex-1 flex w-full items-start h-full gap-x-4">
          <div className="flex-[3] h-full relative bg-primary-4 rounded-lg shadow-custom">
            <Sidebar />
          </div>
          <div className="relative h-full flex-[7] ">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary-4 rounded-lg shadow-custom">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainlayout;
