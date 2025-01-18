"use server";

import prisma from "@/lib/prisma";

export const getYayaUsersList = async (yayaId: string) => {
  try {
    const courses = await prisma.userCourse.findMany({
      where: {
        course: {
          yayaID: yayaId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
            phoneNumber: true,
            email: true,
            avenue: true,
            district: true,
            municipality: true,
            number: true,
          },
        },
        course: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Error retrieving lesson:", error);
    throw new Error(
      "An unexpected error occurred while processing your request."
    );
  }
};

export const getAdminUserLessons = async () => {
  try {
    const courses = await prisma.userLesson.findMany();
    return courses;
  } catch (error) {
    console.error("Error retrieving lesson:", error);
    throw new Error(
      "An unexpected error occurred while processing your request."
    );
  }
};
