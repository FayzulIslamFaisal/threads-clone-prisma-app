"use client";
import { SessionProvider } from "next-auth/react";

const CustomProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CustomProvider;
