import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const courseId = searchParams.get("courseId");

  if (!userId || !courseId) {
    return new Response("Missing required parameters: userId and courseId.", {
      status: 400,
    });
  }

  try {
    const allCourseLessons = await prisma.lessons.count({
      where: {
        courseId: courseId,
      },
    });

    const userCourseLessons = await prisma.lessons.count({
      where: {
        courseId: courseId,
        UserLesson: {
          some: {
            userId: userId,
            completed: true,
          },
        },
      },
    });

    const percent = Math.round((userCourseLessons / allCourseLessons) * 100);

    return NextResponse.json(percent, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
