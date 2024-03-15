"use client";

import React from "react";
import Image from "next/image";
import Github from "@/assets/images/socials/github.png";
import { signIn } from "next-auth/react";

export default function LoginWithGithub() {
  const onClick = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <button onClick={onClick}>
      <Image width={40} height={40} src={Github} className="" alt="google" />
    </button>
  );
}
