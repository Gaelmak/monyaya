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
    const find = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: data.userId,
          courseId: params.id,
        },
      },
    });

    if (!find) {
      return new Response("Already uncompleted lesson", { status: 202 });
    }

    const updatedLesson = await prisma.userCourse.delete({
      where: {
        userId_courseId: {
          userId: data.userId,
          courseId: params.id,
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
