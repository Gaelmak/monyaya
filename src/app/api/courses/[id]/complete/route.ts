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
    const updatedCourse = await prisma.userCourse.upsert({
      where: {
        userId_courseId: {
          userId: data.userId,
          courseId: params.id,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: data.userId,
        courseId: params.id,
        completed: true,
      },
    });

    return NextResponse.json(updatedCourse, { status: 202 });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}
