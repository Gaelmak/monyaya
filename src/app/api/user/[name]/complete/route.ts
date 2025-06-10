import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { name } }: { params: { name: string } }
) {
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      avenue,
      district,
      municipality,
      number,
    } = await req.json();

    // Vérifier si l'email existe déjà pour un autre utilisateur
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        NOT: { name: name },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: 409, message: "Cette adresse email est déjà utilisée." },
        { status: 409 }
      );
    }

    await prisma.user.update({
      where: {
        name: name,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        phoneNumber: phonenumber,
        avenue: avenue,
        district: district,
        municipality: municipality,
        number: number,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/user/[name]/complete:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Erreur serveur lors de la mise à jour de l'utilisateur.",
      },
      { status: 500 }
    );
  }
}
