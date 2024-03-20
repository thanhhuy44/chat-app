"use client";

import { PaperPlaneRight } from "@phosphor-icons/react";
import React, { useState } from "react";

interface Props {
  onSend?: (message: string) => void;
}

export default function InputChat({ onSend }: Props) {
  const [value, setValue] = useState<string>("");

  const onFinish = () => {
    onSend && onSend(value);
    setValue("");
  };

  return (
    <div className="border-t border-gray-300 py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center rounded-full bg-gray-100 p-2 px-4">
        <input
          size={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Type message..."
          className="flex-1 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onFinish();
            }
          }}
        />
        <button onClick={onFinish}>
          <PaperPlaneRight weight="fill" />
        </button>
      </div>
    </div>
  );
}
