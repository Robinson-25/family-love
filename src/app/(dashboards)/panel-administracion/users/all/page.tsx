import React from "react";
import DataTableUsers from "./_components/DataTableUsers/data-table";
import { User } from "@/types/User/user";
import { columns } from "./_components/DataTableColumns/columns";
import { getAllUsers } from "@/db/users/get-all";

const getData = async (): Promise<User[]> => {
  const users = await getAllUsers();
  return users as User[];
};

const Page = async () => {
  const data = await getData();

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex items-center justify-center">
        <DataTableUsers columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
