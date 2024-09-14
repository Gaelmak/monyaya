import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// CREATE
export async function POST(
  req: Request & NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const courseId = params.id;
  const searchParams = req.nextUrl.searchParams;
  const sectionId = searchParams.get("sid");

  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: courseId ?? "",
      },
      select: {
        id: true,
      },
    });

    const section = await prisma.sections.findUnique({
      where: {
        id: sectionId ?? "",
      },
      select: {
        id: true,
      },
    });

    if (!section || !course) {
      return new Response(
        "The specified section or course to attach the lesson to was not found in the database.",
        { status: 404 }
      );
    }

    const lesson = await prisma.lessons.create({
      data: {
        courseId: course.id,
        title: data.title,
        description: data.description,
        content: data.content,
        videoUrl: data.videoUrl,
        meetUrl: data.meetUrl,
        adress: data.adress,
        sectionId: section.id,
      },
    });

    return NextResponse.json(lesson, { status: 202 });
  } catch (error) {
    console.error("Error creating Lesson:", error);
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
