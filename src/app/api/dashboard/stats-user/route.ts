import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing required parameters: courseId and lessonId.", {
      status: 400,
    });
  }

  try {
    const courses = await prisma.userCourse.count({
      where: {
        userId: userId,
      },
    });

    const lessons = await prisma.userLesson.count({
      where: {
        userId: userId,
      },
    });

    const res = {
      courses: courses,
      lessons: lessons,
    };

    return NextResponse.json(res, { status: 202 });
  } catch (error) {
    console.error("Error retrieving lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
