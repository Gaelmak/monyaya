import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, hash, salt } = await req.json();

  await prisma.user.create({
    data: {
      name: name,
      password: hash,
      salt: salt,
    },
  });

  return NextResponse.json({ status: 200 });
}
