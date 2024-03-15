import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={`rounded-lg bg-sky-500 p-3 font-semibold text-white duration-200 active:scale-95 active:opacity-45 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
