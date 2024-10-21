import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// READ
export async function GET(req: Request & NextRequest) {
  try {
    const category = await prisma.category.findMany();

    return NextResponse.json(category, { status: 202 });
  } catch (error) {
    console.error("Error retrieving course:", error);
    return new Response(
      "An unexpected error occurred while processing your request.",
      { status: 500 }
    );
  }
}
