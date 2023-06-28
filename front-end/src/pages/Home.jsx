import HomeImage from "../assets/images/home.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import socket from "../socket";
import { useEffect } from "react";

function Home() {
  const isLogin = useSelector((state) => state.chat.isLogin);
  const user = useSelector((state) => state.chat.authInfo);

  useEffect(() => {
    if (isLogin) {
      socket.emit("online", user?._id);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-primary-5 rounded-lg p-4">
      {isLogin ? (
        <div>
          <img src={HomeImage} alt="home" />
          <p className="mt-4 font-light text-center">
            Bắt đầu trò chuyện với nhau nào!
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-x-4">
          <Link
            to={"/register"}
            className="py-2 px-6 border-[0.5px] border-primary-1 cursor-pointer text-primary-1 font-medium rounded-lg bg-transparent hover:text-white hover:bg-primary-2 hover:border-primary-2 duration-200"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="py-2 px-6 border-[0.5px] border-primary-1 cursor-pointer text-white bg-primary-1 font-medium rounded-lg hover:bg-primary-2 duration-200"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
