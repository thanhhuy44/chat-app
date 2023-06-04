import Image from "next/image";
import logo from "../assets/images/logo.png";
import Link from "next/link";
import request from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLogin, setCurrUser } from "../redux/features/chatSlice";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLogin = useSelector((state) => state.chatApp.isLogin);

  const handleLogout = async () => {
    await dispatch(setLogin(false));
    await dispatch(setCurrUser(""));
  };

  useEffect(() => {
    if (!isLogin) {
      router.replace("/login");
    }
  }, [router.pathname]);

  return (
    <div className="px-8 py-2 bg-primary-5 h-20 flex items-center justify-between">
      <div className="flex items-center h-full gap-4 flex-1">
        {/* <div className="h-[120px]">
            <Image src={logo} alt="logo" className="" />
          </div> */}
        <h1 className="flex-1 font-black text-[48px] leading-[56px] text-primary-1">
          Chat App
        </h1>
      </div>
      <div className="flex items-center gap-x-4 text-primary-1 font-normal text-[20px]">
        {isLogin ? (
          <div className="flex items-center gap-x-4">
            <p>thanhhuy44</p>
            <p className="cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
