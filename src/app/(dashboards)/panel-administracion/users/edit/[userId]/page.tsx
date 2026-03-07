import React from "react";
import FormEditUser from "./_components/Form/form";
import { User } from "@/types/User/user";
import FormEditImage from "./_components/FormEditImage/form";
import { getUserById as getUserByIdDatabase } from "@/db/users/get-by-id";

const getUserById = async (userId: string): Promise<User> => {
  const user = await getUserByIdDatabase(userId);
  return user as User;
};

const Page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUserById(userId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex flex-col gap-10 items-center justify-center py-10">
        <FormEditImage user={user} />
        <FormEditUser user={user} />
      </section>
    </main>
  );
};

export default Page;
