import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// CREATE
export async function POST(req: Request & NextRequest) {
  const data = await req.json();

  try {
    const userCourse = await prisma.userCourse.create({
      data: {
        userId: data.userId,
        courseId: data.courseId,
      },
    });

    return NextResponse.json(userCourse, { status: 202 });
  } catch (error) {
    console.error("Error creating UserCourse:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const completed = searchParams.get("completed");

  try {
    const courses = await prisma.userCourse.findMany({
      where: {
        userId: userId ?? "",
        ...(completed ? { completed: completed === "1" ? true : false } : {}),
      },
      include: {
        course: {
          include: {
            yaya: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!courses) {
      return new Response(
        "The specified course with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    return NextResponse.json(courses, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
