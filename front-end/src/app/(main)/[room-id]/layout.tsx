import React, { ReactNode } from "react";
import Header from "./(components)/Header";
import QueryProvider from "@/components/QueryProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <QueryProvider>
        <Header />
        {children}
      </QueryProvider>
    </div>
  );
}
