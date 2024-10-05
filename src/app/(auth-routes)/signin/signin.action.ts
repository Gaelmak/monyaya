"use server";

import prisma from "@/lib/prisma";

export default async function isUserExist(userName: string) {
  const user = await prisma.user.findUnique({
    where: {
      name: userName,
    },
  });
  return user ? true : false;
}

export async function isEmailExist(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user ? true : false;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
}

export async function findToken(email: string) {
  try {
    const findToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    });
    return findToken;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function createToken(email: string) {
  try {
    const createToken = await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: crypto.randomUUID(),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });
    return createToken;
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
}

export async function verifyToken(token: string) {
  try {
    const verifyToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });
    return verifyToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function updatePassword(email: string, hash: string, salt) {
  try {
    const updatePassword = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hash,
        salt: salt,
      },
    });

    // delete all user verificationToken
    if (updatePassword) {
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: email,
        },
      });
    }
    return updatePassword;
  } catch (error) {
    console.error("Error updating password:", error);
    return null;
  }
}
