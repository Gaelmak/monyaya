import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST (
  req: Request
) {
  const { userId, training_name, training_description, chapters, price, category} = await req.json()

  await prisma.trainings.create({
    include: {
      modules: true
    },
    data: {
      name: training_name,
      description: training_description,
      userId: userId,
      price: price,
      coursesId: category,
      modules: {
        create: chapters
      }
    }
  })

  return NextResponse.json({ status: 200 });

}