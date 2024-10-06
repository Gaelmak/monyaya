import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: params.id,
      },
      include: {
        yaya: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                firstName: true,
                lastName: true,
                bio: true,
              },
            },
          },
        },
        category: true,
        lessons: {
          select: {
            id: true,
            title: true,
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
        title: data.title,
        description: data.description,
        cover: data.cover,
        videoUrl: data.videoUrl,
        monthlyPrice: data.monthlyPrice,
        duration: data.duration,
        categoryId: data.categoryId,
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

// DELETE
export async function DELETE(
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

    const deletedCourse = await prisma.courses.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(deletedCourse, { status: 202 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}
