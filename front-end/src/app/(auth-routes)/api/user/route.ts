import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function POST (
  req: Request
) {
  const { firstname, lastname, phonenumber, name, email, hash, salt } = await req.json();

  await prisma.user.create({
    data: { 
      firstName : firstname,
      lastName : lastname, 
      phoneNumber : phonenumber, 
      name : name, 
      email : email, 
      password : hash,
      salt : salt,
    },
  });

  return NextResponse.json({ status: 200 });

}
