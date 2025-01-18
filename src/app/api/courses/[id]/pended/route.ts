import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!course) {
      return new Response(
        "The specified course with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    const updatedCourse = await prisma.courses.update({
      where: {
        id: params.id,
      },
      data: {
        status: "PENDING",
      },
    });

    return NextResponse.json(updatedCourse, { status: 202 });
  } catch (error) {
    console.error("Error updating course:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}
