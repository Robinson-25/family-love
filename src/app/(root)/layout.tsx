import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header/header";
import CheckAvailabilityPageContextProvider from "./_components/CheckAvailabilityPageProvider/context-provider";
import Footer from "@/components/Footer/footer";
import WhatsAppButton from "./_components/WhatsAppButton/WhatsAppButton";

export const metadata: Metadata = {
  title: "Family Love",
  description:
    "En Family Love, somos una organización dedicada a fortalecer el núcleo familiar y brindar apoyo integral a quienes más lo necesitan",
  icons: {
    icon: "/images/hero-images/logo-family-love.png",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckAvailabilityPageContextProvider>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </CheckAvailabilityPageContextProvider>
    </>
  );
}