import React from "react";
import RegisterForm from "./_components/RegisterForm/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrate",
};

const Page = () => {
  return (
    <main>
      <RegisterForm />
    </main>
  );
};

export default Page;
