import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import userApi from "../api/user";
import { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async () => {
    setIsSending(true);
    const respone = await userApi.login(userName, password);
    console.log(respone);
    setIsSending(false);
  };

  return (
    <div className="flex items-center w-[400px] bg-primary-5 rounded-lg p-4 text-primary-1">
      <div className="w-full flex flex-col items-center justify-center">
        <Link to={"/"}>
          <img className="w-20" src={Logo} alt="logo" />
        </Link>
        {/* <h3 className="text-center text-2xl font-bold">Login</h3> */}
        <div className="mt-4 w-full flex flex-col gap-y-2">
          <div className="">
            <label className="block p-2" htmlFor="username">
              Email or User Name
            </label>
            <input
              className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
              id="username"
              type="text"
              placeholder="Email of User Name..."
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="">
            <label className="block p-2" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
              id="password"
              type="text"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Link className="hover:underline" to={"/register"}>
              Forgot password?
            </Link>
          </div>
          <div
            onClick={() => {
              if (!isSending) {
                handleLogin();
              }
            }}
            className="mt-4 bg-primary-1 hover:bg-primary-2 duration-100 text-center text-lg font-semibold py-2 rounded-lg text-white cursor-pointer"
          >
            {isSending ? (
              <div className="flex items-center justify-center w-full">
                <CircleNotch size={28} weight="bold" className="animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </div>

          <div className="mt-2 text-center flex justify-center gap-x-1">
            <p className="text-black">Haven't account yet?</p>
            <Link className="hover:underline" to={"/register"}>
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
