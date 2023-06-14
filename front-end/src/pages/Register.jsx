import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useState } from "react";
import userApi from "../api/user";
import { CircleNotch } from "@phosphor-icons/react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleRegister = async () => {
    setIsSending(true);
    const respone = await userApi.register(
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password
    );
    console.log(respone);
    setIsSending(false);
  };

  return (
    <div className="flex items-center w-[800px] bg-primary-5 rounded-lg p-4 text-primary-1">
      <div className="w-full flex flex-col items-center justify-center">
        <Link to={"/"}>
          <img className="w-20" src={Logo} alt="logo" />
        </Link>
        {/* <h3 className="text-center text-2xl font-bold">Login</h3> */}
        <div className="mt-4 w-full flex flex-col gap-y-2">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <label className="block p-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
                id="firstName"
                type="text"
                placeholder="First Name..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="">
              <label className="block p-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
                id="lastName"
                type="text"
                placeholder="Last Name..."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <label className="block p-2" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
                id="email"
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <label className="block p-2" htmlFor="phoneNumber">
                Phone
              </label>
              <input
                className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
                id="phoneNumber"
                type="tel"
                placeholder="Phone..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <label className="block p-2" htmlFor="userName">
              User Name
            </label>
            <input
              className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
              id="userName"
              type="text"
              placeholder="User Name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="">
            <label className="block p-2" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
              id="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="">
            <label className="block p-2" htmlFor="passwordRepeat">
              Verify password
            </label>
            <input
              className="block w-full py-2 px-4 rounded-lg focus:outline-none border border-transparent focus:border-primary-1 duration-200"
              id="passwordRepeat"
              type="password"
              placeholder="Verify Password..."
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>

          <div
            onClick={() => {
              if (!isSending) {
                handleRegister();
              }
            }}
            className="mt-4 bg-primary-1 hover:bg-primary-2 duration-100 text-center text-lg font-semibold py-2 rounded-lg text-white cursor-pointer"
          >
            {isSending ? (
              <div className="flex items-center justify-center w-full">
                <CircleNotch size={28} weight="bold" className="animate-spin" />
              </div>
            ) : (
              "Register"
            )}
          </div>

          <div className="mt-2 text-center flex justify-center gap-x-1">
            <p className="text-black">Have account?</p>
            <Link className="hover:underline" to={"/login"}>
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
