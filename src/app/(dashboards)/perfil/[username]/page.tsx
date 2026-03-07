import React from "react";
import { getUserById } from "@/db/users/get-by-id";
import { User } from "@/types/User/user";
import { getServerSession } from "next-auth";
import { UserX } from "lucide-react";
import UserEditForm from "./_components/UserEditForm/form";
import UserEditImageForm from "./_components/UserEditImageForm/form";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const getData = async (userId: string): Promise<User> => {
  const user = await getUserById(userId);
  return user as User;
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const data = await getData(session.user.id as string);
    return (
      <main className="w-full min-h-screen">
        <section className="w-full h-full flex flex-col gap-8 items-center justify-center px-6">
          <UserEditImageForm user={data} />
          <UserEditForm user={data} />
        </section>
      </main>
    );
  } else {
    return (
      <main className="w-full min-h-screen">
        <section className="w-full h-full flex flex-col gap-4 items-center justify-center px-6">
          <UserX />
          <p className="text-sm text-center">El usuario no existe</p>
        </section>
      </main>
    );
  }
};

export default Page;
