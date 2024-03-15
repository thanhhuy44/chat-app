import React from "react";
import LoginForm from "../(components)/LoginForm";
import Link from "next/link";
import LoginWithGoogle from "../(components)/LoginWithGoogle";
import LoginWithGithub from "../(components)/LoginWithGithub";

export default function Page() {
  return (
    <div className="flex h-full flex-col justify-center gap-y-4">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      <h5 className="text-lg font-semibold text-gray-700">Login</h5>
      <LoginForm />
      {/* <div className="flex justify-end">
        <Link
          href={"/forgot-password"}
          className="text-sm font-medium text-sky-500"
        >
          Forgot password
        </Link>
      </div> */}
      <div className="flex items-center justify-center gap-x-2 text-sm text-gray-600">
        <p>Haven't account?</p>
        <Link className="text-sky-500" href={"/register"}>
          Register
        </Link>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <span className="flex-1 border-t border-gray-200"></span>
          <p>OR</p>
          <span className="flex-1 border-t border-gray-200"></span>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <LoginWithGoogle />
          <LoginWithGithub />
        </div>
      </div>
    </div>
  );
}
