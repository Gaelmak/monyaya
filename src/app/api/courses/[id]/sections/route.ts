import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const courseId = params.id;
  const data = await req.json();

  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      return new Response(
        "The course to attach the section to was not found in the database.",
        { status: 404 }
      );
    }

    const section = await prisma.sections.create({
      data: {
        courseId: courseId,
        title: data.title,
        description: data.description,
        order: data.order,
      },
    });

    return NextResponse.json(section, { status: 202 });
  } catch (error) {
    console.error("Error creating Section:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}

// READ
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sections = await prisma.sections.findMany({
      where: {
        courseId: params.id,
      },
    });

    return NextResponse.json(sections, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
