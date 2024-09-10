import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  if (!data.userId) {
    return new Response("Missing required parameters: userId", {
      status: 400,
    });
  }

  try {
    const updatedLesson = await prisma.userLesson.upsert({
      where: {
        userId_lessonId: {
          userId: data.userId,
          lessonId: params.id,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: data.userId,
        lessonId: params.id,
        completed: true,
      },
    });

    return NextResponse.json(updatedLesson, { status: 202 });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}
