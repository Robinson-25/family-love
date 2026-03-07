import type { Metadata } from "next";
import "../../globals.css";
import SideBar from "./_components/SideBar/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="min-h-screen w-full px-6 sm:px-8">{children}</div>
    </div>
  );
}
