import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const yayaId = searchParams.get("yayaId");

  if (!yayaId) {
    return new Response("Missing required parameters: courseId and lessonId.", {
      status: 400,
    });
  }

  try {
    const courses = await prisma.courses.findMany({
      where: {
        yaya: { id: yayaId },
      },
      include: {
        lessons: true,
        UserCourse: true,
      },
    });

    let coursesCount = 0;
    courses.forEach((course) => {
      coursesCount += course.lessons.length;
    });

    let etudiantsCount = 0;
    courses.forEach((course) => {
      etudiantsCount += course.UserCourse.length;
    });

    const res = {
      courses: courses.length,
      lessons: coursesCount,
      etudiants: etudiantsCount,
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
