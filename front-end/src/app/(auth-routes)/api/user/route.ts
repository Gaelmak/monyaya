import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { firstname, lastname, name, email, hash, salt } = await req.json();

  await prisma.user.create({
    data: { 
      firstName : firstname,
      lastName : lastname,
      name : name, 
      email : email, 
      password : hash,
      salt : salt,
    },
  });

  return NextResponse.json({ status: 200 });

}
