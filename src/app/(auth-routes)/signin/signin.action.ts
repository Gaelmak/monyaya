'use server';

import prisma from '@/lib/prisma';

export default async function isUserExist(userName: string) {
  const user = await prisma.user.findUnique({
    where: {
      name: userName,
    },
  });
  return user ? true : false;
}
