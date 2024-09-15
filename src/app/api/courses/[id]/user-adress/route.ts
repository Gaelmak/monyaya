import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(
  req: Request & NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  try {
    const course = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: params.id,
          courseId: userId ?? "",
        },
      },
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
    });

    if (!course) {
      return new Response(
        "The specified course with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
