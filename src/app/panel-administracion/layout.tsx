import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SidebarAdmin from "./_components/SidebarAdmin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role === "customer") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <SidebarAdmin />
      <main className="flex-1 p-4 md:p-8 w-full">{children}</main>
    </div>
  );
}
