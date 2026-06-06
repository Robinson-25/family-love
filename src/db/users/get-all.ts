import { db } from "@/lib/db";

export const getAllUsers = async () => {
  const [users] = await db.execute("SELECT * FROM User") as any;
  return users;
};