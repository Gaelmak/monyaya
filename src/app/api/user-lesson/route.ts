import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const completed = searchParams.get("completed");

  if (!userId) {
    return new Response("Missing required parameters: userId", {
      status: 400,
    });
  }

  try {
    const lessons = await prisma.userLesson.findMany({
      where: {
        userId: userId,
        ...(completed ? { completed: completed === "1" ? true : false } : {}),
      },
      include: {
        lesson: true,
      },
    });

    if (!lessons) {
      return new Response(
        "The specified course with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    return NextResponse.json(lessons, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
