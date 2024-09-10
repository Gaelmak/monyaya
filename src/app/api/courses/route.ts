import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// CREATE
export async function POST(req: Request) {
  const data = await req.json();

  try {
    const yaya = await prisma.user
      .findUnique({
        where: {
          id: data.userID,
        },
        include: {
          yaya: true,
        },
      })
      .then((data) => data?.yaya);

    if (!yaya) {
      return new Response(
        "The specified Yaya with the provided user ID was not found in the database.",
        { status: 404 }
      );
    }

    const course = await prisma.courses.create({
      data: {
        yayaID: yaya.id,
        type:
          data.type === "domicile"
            ? "DOMICILE"
            : data.type === "onsite"
            ? "ONSITE"
            : "ONLINE",
        status: "PENDING",
        title: data.title,
        description: data.description,
        cover: data.cover,
        videoUrl: data.VideoUrl,
        monthlyPrice: data.monthlyPrice,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json(course, { status: 202 });
  } catch (error) {
    console.error("Error creating Course:", error);
    return new Response(
      "An unexpected error occurred while processing your request. Please review the data you provided and try again later.",
      { status: 500 }
    );
  }
}

// READ
export async function GET(req: Request & NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = searchParams.get("categoryId");
  const yayaId = searchParams.get("yayaId");
  const status = searchParams.get("status");

  try {
    const courses = await prisma.courses.findMany({
      where: {
        ...(categoryId ? { categoryId: categoryId } : {}),
        ...(yayaId ? { yaya: { id: yayaId } } : {}),
        ...(status
          ? { status: status === "pending" ? "PENDING" : "APPROVED" }
          : {}),
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
