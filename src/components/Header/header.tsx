import React from "react";
import Image from "next/image";
import Navbar from "./_components/Navbar/navbar";
import Link from "next/link";
import UserProfile from "./_components/UserProfile/user-profile";
import ToggleTheme from "../ToggleTheme/toggle-theme";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";

const getData = async () => {
  const hotelCenters = await getAllHotelCenters();
  return { hotelCenters: hotelCenters as HotelCenter[] };
};

const Header = async () => {
  const data = await getData();

  return (
    <header
      className={`sticky z-[70] top-0 bg-[rgba(250,250,250,1)] dark:bg-[rgba(0,0,0,0.85)] text-black dark:text-white right-0 left-0 w-full pr-3 sm:px-6 py-2 flex justify-between items-center`}
    >
      <div className="flex items-center gap-0 sm:gap-4">
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
        <Navbar hotelCentersData={data.hotelCenters} />
      </div>
      <div className="flex items-center gap-4 md:gap-5">
        <Link
          href={"/contacto"}
          className="h-9 hidden text-sm rounded-md font-normal tracking-wide sm:flex sm:items-center sm:justify-center bg-[#0271bd] hover:bg-[#6923b7] transition-all duration-300 text-white w-36"
        >
          Sede Contáctos
        </Link>
        <ToggleTheme />
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
