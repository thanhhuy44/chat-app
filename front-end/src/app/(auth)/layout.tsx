import React from "react";
import { Inter } from "next/font/google";
import Thumbnail from "@/assets/images/mario.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen min-w-[100vw] items-center justify-center p-2 sm:p-4">
          <div className="m-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-lg border border-transparent sm:border-gray-300 md:grid-cols-2 md:shadow-lg">
            <div className="p-4 md:p-8">{children}</div>
            <div className="hidden items-center justify-center bg-sky-500 p-8 md:flex">
              <Image src={Thumbnail} alt="thumbnail" width={200} height={500} />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
