import React from "react";
import Image from "next/image";
import Navbar from "./_components/Navbar/navbar";
import Link from "next/link";
import UserProfile from "./_components/UserProfile/user-profile";
import ToggleTheme from "../ToggleTheme/toggle-theme";

const Header = async () => {
  return (
    <header
      className={`sticky z-[70] top-0 bg-[rgba(250,250,250,1)] dark:bg-[rgba(0,0,0,0.85)] text-black dark:text-white right-0 left-0 w-full pr-3 sm:px-6 py-2 flex justify-between items-center`}
    >
      {/* Logo */}
      <Link href={`/`} className="w-12 md:w-14">
        <Image
          priority
          src={"/images/hero-images/logo-family-love.png"}
          className="w-full"
          width={150}
          height={150}
          alt="Logo Family Love"
        />
      </Link>

      {/* Navbar centrado */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Navbar />
      </div>

      {/* Botones derecha */}
      <div className="flex items-center gap-4 md:gap-5">
        <ToggleTheme />
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;