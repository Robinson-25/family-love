import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
  const [rows] = await db.execute(
    "SELECT * FROM User WHERE id = ?",
    [id]
  ) as any;
  const user = (rows as any[])[0];
  return user;
};