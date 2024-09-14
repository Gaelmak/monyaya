import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
