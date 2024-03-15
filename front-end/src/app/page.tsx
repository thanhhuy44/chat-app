"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <button
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: "/login",
          });
        }}
      >
        Logout
      </button>
    </main>
  );
}
