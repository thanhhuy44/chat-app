import React from "react";
import Link from "next/link";
import RegisterForm from "../(components)/RegisterForm";

export default function Page() {
  return (
    <div className="flex h-full flex-col justify-center gap-y-4">
      <h1 className="text-3xl font-bold">Welcome to my show!</h1>
      <h5 className="text-lg font-semibold text-gray-700">Register</h5>
      <RegisterForm />
      <div className="flex items-center justify-center gap-x-2 text-sm text-gray-600">
        <p>Have account yet?</p>
        <Link className="text-sky-500" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}
