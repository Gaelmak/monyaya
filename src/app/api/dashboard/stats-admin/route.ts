import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  try {
    const users = await prisma.user.findMany();
    const yayas = await prisma.yaya.findMany();
    const courses = await prisma.courses.findMany();
    const lessons= await prisma.lessons.findMany();
    const category= await prisma.category.findMany();

      const res = {
    
      users: users.length,
      yayas: yayas.length,
      courses: courses.length,
      lessons: lessons.length,
      session: category.length,
    };

    return NextResponse.json(res, { status: 202 });
  } catch (error) {
    console.error("Error retrieving stats:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}