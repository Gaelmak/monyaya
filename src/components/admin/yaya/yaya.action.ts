"use server";

import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";

export default async function getYayas(status: string) {
  const user = await userAuth();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    const yayas = await prisma.user.findMany({
      where: {
        yaya: {
          status: status === "APPROVED" ? "APPROVED" : "PENDING",
        },
      },
      include: {
        yaya: true,
      },
    });

    return yayas;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function confirmYaya(name: string, status: string) {
  const user = await userAuth();

  if (!user) {
    throw new Error("Not authenticated");
  }

  try {
    const user = await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { name: name },
        data: {
          role: "TRAINER",
        },
      });

      await prisma.yaya.update({
        where: { userId: updatedUser.id },
        data: {
          status:
            status === "APPROVED"
              ? "APPROVED"
              : status === "REJECTED"
              ? "REJECTED"
              : status === "ARCHIVED"
              ? "ARCHIVED"
              : "PENDING",
        },
      });

      return updatedUser;
    });

    return user;
  } catch (error) {
    console.error(error);
    return [];
  }
}
