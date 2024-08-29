import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params: { name } }: { params: { name: string } }
) {
  const { avenue, district, municipality, number } = await req.json();

  await prisma.user.update({
    where: {
      name: name,
    },
    data: {
      avenue: avenue,
      district: district,
      municipality: municipality,
      number: number,
    },
  });

  return NextResponse.json({ status: 200 });
}
