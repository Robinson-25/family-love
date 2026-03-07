import { prisma } from "@/lib/prisma";


export const getAmenitieById = async (id: string) => {
  const amenitie = await prisma.amenitie.findUnique({
    where: { id },
  });
  return amenitie;
};
