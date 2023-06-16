import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useState } from "react";
import userApi from "../api/user";
import { CircleNotch } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  const handleRegister = async (data) => {
    const { firstName, lastName, phoneNumber, email, userName } = data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    setIsSending(true);
    const respone = await userApi.register(
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password
    );
    if (respone.type === "success") {
      if (respone.data?.errCode === 0) {
        toast.success("Register successfully!");
        navigate("/login");
      } else {
        toast.error(respone.data?.message);
      }
    } else {
      toast.error("Something went wrong, please try again!");
    }
    setIsSending(false);
  };

  return (
    <div className="flex items-center w-[700px] bg-primary-5 rounded-lg p-4 text-primary-1">
      <div className="w-full flex flex-col items-center justify-center">
        <Link to={"/"}>
          <img className="mx-auto w-20" src={Logo} alt="logo" />
        </Link>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col w-full gap-y-6 mt-6"
        >
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <div
                className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                  errors.firstName && "!border-red-500"
                }`}
              >
                <input
                  {...register("firstName", {
                    required: "First name is required!",
                  })}
                  type="text"
                  placeholder="First name..."
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm font-light px-2">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                  errors.lastName && "!border-red-500"
                }`}
              >
                <input
                  {...register("lastName", {
                    required: "Last name is required!",
                  })}
                  type="text"
                  placeholder="Last name..."
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm font-light px-2">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <div
                className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                  errors.email && "!border-red-500"
                }`}
              >
                <input
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please typing correct email!",
                    },
                  })}
                  type="text"
                  placeholder="Email..."
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm font-light px-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div
                className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                  errors.phoneNumber && "!border-red-500"
                }`}
              >
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required!",
                    pattern: {
                      value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                      message: "Please typing correct phone number!",
                    },
                  })}
                  type="text"
                  placeholder="Phone number..."
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm font-light px-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div
              className={`py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                errors.userName && "!border-red-500"
              }`}
            >
              <input
                {...register("userName", {
                  required: "User name is required!",
                  minLength: {
                    value: 6,
                    message: "User name must be at least 6 characters",
                  },
                })}
                type="text"
                placeholder="User name..."
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
          <div>
            <div
              className={`flex items-center w-full py-2 px-4 border-[0.5px] border-gray-200 rounded-2xl bg-primary-4 focus:outline-none focus-within:border-primary-1 duration-200 outline-none ${
                errors.repeatPassword?.message && "!border-red-500"
              }`}
            >
              <input
                {...register("repeatPassword", {
                  required: "Verify password is required!",
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match!";
                    }
                  },
                })}
                type={showRepeatPassword ? "text" : "password"}
                className="flex-1"
                placeholder="Verify password..."
              />
              <div
                onClick={() => {
                  setShowRepeatPassword(!showRepeatPassword);
                }}
                className="p-1 rounded-full bg-transparent hover:bg-primary-5 cursor-pointer duration-200"
              >
                {setShowRepeatPassword ? <EyeSlash /> : <Eye />}
              </div>
            </div>
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm font-light px-2">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
          {isSending ? (
            <div className="text-white text-xl font-medium py-2 rounded-xl cursor-wait border-[0.5px] border-primary-4 hover:border-white bg-primary-2">
              <CircleNotch className="mx-auto animate-spin text-xl" size={28} />
            </div>
          ) : (
            <input
              type="submit"
              value={"Register"}
              className="bg-primary-1 text-white text-xl font-medium py-2 rounded-xl cursor-pointer border-[0.5px] border-primary-4 hover:border-white hover:bg-primary-2"
            />
          )}

          <div className="flex items-center justify-center gap-x-2">
            <p className="text-black font-light">Have account?</p>
            <Link to={"/login"} className="inline w-fit hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
