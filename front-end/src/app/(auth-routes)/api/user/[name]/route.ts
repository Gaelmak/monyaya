import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params: { name } } : { params: { name: string } }
) {
  const {
    bio,
    district,
    municipality,
    avenue,
    number,
    payment_number,
    terms_and_conditions
  } = await req.json();

  await prisma.user.update({
    where : {
      name : name
    },
    data: {
      bio : bio,
      municipality : municipality,
      district : district,
      avenue : avenue,
      number : number,
      paymentNumber : payment_number,
      terms_accepted : terms_and_conditions,
      role : 'TRAINER'
    }
  })

  return NextResponse.json({ status: 200 });

}