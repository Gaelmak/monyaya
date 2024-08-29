import { auth } from '@/auth';
import type { User } from '@prisma/client';

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
