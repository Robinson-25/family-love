import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Family Love",
  description: "Family Love - Organización de voluntariado",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}