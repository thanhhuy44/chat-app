import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/images/logo.png";
import userApi from "../api/user";
import { CircleNotch, Eye, EyeSlash } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthInfo, setLogIn } from "../redux/features/chatSlice";
import Cookies from "js-cookie";
import socket from "../socket";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsSending(true);
    const { userName, password } = data;
    const response = await userApi.login(userName, password);
    if (response.type === "success") {
      if (response.data.errCode === 0) {
        await socket.connect();
        toast.success("Login successfully!");
        Cookies.set("token", response.data?.token);
        dispatch(setLogIn(true));
        dispatch(setAuthInfo(response.data.data));
        await socket.emit("online", response.data.data?._id);
        navigate("/");
      } else {
        toast.error(response.data?.message);
      }
    } else {
      toast.error("Something went wrong, please try again!");
    }
    setIsSending(false);
  };

  return (
    <div className="flex items-center w-[400px] bg-primary-5 rounded-lg p-4 text-primary-1">
      <div className="w-full flex flex-col items-center justify-center">
        <Link to={"/"}>
          <img className="mx-auto w-20" src={Logo} alt="logo" />
        </Link>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col w-full gap-y-6 mt-6"
        >
          <div>
            <div
              className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                errors.userName && "!border-red-500"
              }`}
            >
              <input
                {...register("userName", {
                  required: "Username is required!",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters!",
                  },
                })}
                type="text"
                placeholder="Username..."
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-sm font-light px-2">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div>
            <div
              className={`flex items-center w-full py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                errors.password && "!border-red-500"
              }`}
            >
              <input
                {...register("password", {
                  required: "Password is required!",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      "Password must be minimum eight characters, at least one letter, one number and one special character!",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="flex-1"
                placeholder="Password..."
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="p-1 rounded-full bg-transparent hover:bg-primary-5 cursor-pointer duration-200"
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm font-light px-2">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* <div className="px-2 flex justify-end">
            <Link className="w-fit" to={"/register"}>
              Forgot password?
            </Link>
          </div> */}

          {isSending ? (
            <div className="text-white text-xl font-medium py-2 rounded-xl cursor-wait border-[0.5px] border-primary-4 hover:border-white bg-primary-2">
              <CircleNotch className="mx-auto animate-spin text-xl" size={28} />
            </div>
          ) : (
            <input
              type="submit"
              value={"Login"}
              className="bg-primary-1 text-white text-xl font-medium py-2 rounded-xl cursor-pointer border-[0.5px] border-primary-4 hover:border-white hover:bg-primary-2"
            />
          )}
          <div className="flex flex-col items-center gap-y-1">
            <p className="text-black font-light">Haven't account yet?</p>
            <Link to={"/register"} className="w-fit hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
