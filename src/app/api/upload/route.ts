import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get("filename");

    // ⚠️ The below code is for App Router Route Handlers only
    const blob = await put(filename, req.body, {
      access: "public",
    });

    if (!blob) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    return NextResponse.json(blob, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
