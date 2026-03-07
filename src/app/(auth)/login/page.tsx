import React from "react";
import LoginForm from "./_components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicia Sesión",
};

const Page = () => {
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Page;
