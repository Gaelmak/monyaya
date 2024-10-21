import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params: { name } }: { params: { name: string } }
) {
  const { firstname, lastname, email, phonenumber } = await req.json();

  await prisma.user.update({
    where: {
      name: name,
    },
    data: {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phoneNumber: phonenumber,
    },
  });

  return NextResponse.json({ status: 200 });
}
