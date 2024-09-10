import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lessons = await prisma.lessons.findMany({
      where: {
        courseId: params.id,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(lessons, { status: 202 });
  } catch (error) {
    console.error("Error retrieving lessons:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
