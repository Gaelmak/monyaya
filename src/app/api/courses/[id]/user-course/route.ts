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
          userId: userId ?? "",
          courseId: params.id,
        },
      },
    });

    if (!course) {
      return NextResponse.json(null, { status: 202 });
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
