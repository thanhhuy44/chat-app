import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

function Login() {
  return (
    <div className="flex items-center w-[400px] bg-primary-5 rounded-lg p-4 text-primary-1">
      <div className="w-full flex flex-col items-center justify-center">
        <img className="w-20" src={Logo} alt="logo" />
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
            />
          </div>
          <div className="flex justify-end">
            <Link className="hover:underline" to={"/register"}>
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 bg-primary-1 hover:bg-primary-2 duration-100 text-center text-lg font-semibold py-2 rounded-lg text-white cursor-pointer">
            Login
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
