import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Mainlayout({ children }) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <Sidebar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Mainlayout;
