import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { status } = await req.json();
  const data = await prisma.learners.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  await pusherServer.trigger(id, 'change_to_approved', {
    result: `${JSON.stringify(data)}\n\n`,
  });

  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.learners.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200 });
}
