import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH (
  req: Request,
  { params: { name } } : { params: { name: string } }
) {
  const {
    url
  } = await req.json();

  await prisma.user.update({
    where : {
      name : name
    },
    data: {
      image : url,
    }
  })

  return NextResponse.json({ status: 200 });
}