import { prisma } from "@/lib/prisma";


export const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });
  return service;
};
