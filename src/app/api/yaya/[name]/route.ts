import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    const { bio, terms_and_conditions } = await req.json();

    await prisma.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { name: name },
        data: {
          bio: bio,
          terms_accepted: terms_and_conditions,
        },
      });

      await prisma.yaya.create({
        data: {
          userId: updatedUser.id,
          status: "PENDING",
        },
      });

      return updatedUser;
    });

    return Response.json({ status: 200 });
  } catch (error) {
    console.error("Error updating user or creating Yaya:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
