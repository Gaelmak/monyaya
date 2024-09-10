import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lesson = await prisma.lessons.findUnique({
      where: {
        id: params.id,
      },
      include: {
        course: {
          include: {
            category: true,
            yaya: true,
          },
        },
      },
    });

    if (!lesson) {
      return new Response(
        "The specified lesson with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    return NextResponse.json(lesson, { status: 202 });
  } catch (error) {
    console.error("Error retrieving lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}

// UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  try {
    const lesson = await prisma.lessons.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!lesson) {
      return new Response(
        "The specified lesson with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    const updatedLesson = await prisma.lessons.update({
      where: {
        id: params.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        videoUrl: data.VideoUrl,
        meetUrl: data.meetUrl,
        adress: data.adress,
      },
    });

    return NextResponse.json(updatedLesson, { status: 202 });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  try {
    const lesson = await prisma.lessons.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!lesson) {
      return new Response(
        "The specified lesson with the provided ID was not found in the database.",
        { status: 404 }
      );
    }

    const deletedLesson = await prisma.lessons.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(deletedLesson, { status: 202 });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}
