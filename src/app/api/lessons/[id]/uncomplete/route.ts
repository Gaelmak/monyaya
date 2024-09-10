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
    const find = await prisma.userLesson.findUnique({
      where: {
        userId_lessonId: {
          userId: data.userId,
          lessonId: params.id,
        },
      },
    });

    if (!find) {
      return new Response("Already uncompleted lesson", { status: 202 });
    }

    const updatedLesson = await prisma.userLesson.delete({
      where: {
        userId_lessonId: {
          userId: data.userId,
          lessonId: params.id,
        },
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
