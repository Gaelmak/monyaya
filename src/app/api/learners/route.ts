import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, trainingId } = await req.json();

  const data = await prisma.learners.create({
    data: {
      userId: userId,
      trainingId: trainingId,
    },
  });

  await pusherServer.trigger(userId, 'add', {
    result: `${JSON.stringify(data)}\n\n`,
  });

  return NextResponse.json({ status: 200 });
}
