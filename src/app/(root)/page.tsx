import React from "react";
import HeroSection from "./_components/HeroSection/hero-section";
import BookingSection from "./_components/BookingSection/booking-section";
import OfficeSection from "./_components/OfficeSection/office-section";
import AboutUsSection from "./_components/AboutUsSection/section";

const Page = () => {
  return (
    <main>
      <HeroSection />
      {/* <OfficeSection /> */}
      <AboutUsSection />
    </main>
  );
};

export default Page;
