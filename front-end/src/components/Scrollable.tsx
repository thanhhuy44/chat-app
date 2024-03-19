"use client";
import React, { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode | ReactNode[] | string | undefined;
  onScrollEnd?: () => void;
}

export default function Scrollable({ children, onScrollEnd }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      onScrollEnd && onScrollEnd();
    }
  };

  return (
    <div className="relative h-full w-full flex-1">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="absolute bottom-0 left-0 right-0 top-0 overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}
