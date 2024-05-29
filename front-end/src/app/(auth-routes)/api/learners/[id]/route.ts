import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params: { id } } : { params: { id: string } }
) {
  const {
    status
  } = await req.json();

  await prisma.learners.update({
    where : {
      id : id
    },
    data: {
      status : status,
    }
  })

  return NextResponse.json({ status: 200 });

}