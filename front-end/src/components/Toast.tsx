"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Toast() {
  const [mout, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mout ? <Toaster /> : null;
}
