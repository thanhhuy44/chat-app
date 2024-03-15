"use client";

import React from "react";
import Image from "next/image";
import Google from "@/assets/images/socials/google.png";
import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => {
        signIn("google", {
          redirect: true,
          callbackUrl: "/",
        });
      }}
    >
      <Image width={40} height={40} src={Google} className="" alt="google" />
    </button>
  );
}
