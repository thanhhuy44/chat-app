import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function Header() {
  return (
    <div className="flex items-center justify-between w-full px-8 py-2 bg-primary-5">
      <Link to={"/"}>
        <div className="flex items-center gap-x-2">
          <img src={Logo} alt="logo" className="h-[80px]" />
          <h1 className="text-3xl font-medium text-primary-1">Chat App</h1>
        </div>
      </Link>
      <div className="flex items-center gap-x-1 text-xl text-primary-1">
        <Link to={"/register"}>
          <p className="px-4">Register</p>
        </Link>
        <Link to={"/login"}>
          <p className="px-4">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
