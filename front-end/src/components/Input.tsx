"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  rightIcon?: ReactNode;
}

const Input = React.forwardRef(
  ({ containerClassName, rightIcon, className, ...props }: Props, ref) => {
    return (
      <div
        className={`flex w-full items-center rounded-md border border-gray-200 px-4 py-2 duration-200 focus-within:border-sky-400 ${containerClassName}`}
      >
        <input
          size={1}
          ref={ref as any}
          className={`flex-1 bg-transparent outline-none ${className}`}
          {...props}
        />
        {rightIcon}
      </div>
    );
  },
);

export default Input;
