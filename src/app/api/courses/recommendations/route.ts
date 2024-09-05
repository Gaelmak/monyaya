import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  try {
    const courses = await prisma.courses.findMany({
      where: {
        status: "APPROVED",
      },
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
        category: true,
      },
      take: 1,
      orderBy: {
        id: "asc",
      },
      skip: Math.floor(
        Math.random() *
          (await prisma.courses.count({ where: { status: "APPROVED" } }))
      ),
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
