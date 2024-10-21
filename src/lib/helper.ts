import { auth } from "@/auth";
import type { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const userAuth = async () => {
  const session = await auth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const userAuthRole = async () => {
  const session = await auth();

  if (session?.user) {
    const role = await prisma.user
      .findUnique({
        where: {
          name: session.user.name ?? "",
        },
        select: {
          role: true,
        },
      })
      .then((data) => data?.role);
    return role;
  }

  return null;
};

export const userAuthYaya = async () => {
  const session = await auth();

  if (session?.user) {
    const yaya = await prisma.user
      .findUnique({
        where: {
          name: session.user.name ?? "",
        },
        select: {
          yaya: true,
        },
      })
      .then((data) => data?.yaya);
    return yaya;
  }

  return null;
};
