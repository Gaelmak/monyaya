"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export async function getAllUserCourses(
  filterCompleted: boolean,
  filterSearch: string
) {
  try {
    const courses = await prisma.userCourse.findMany({
      where: {
        completed: filterCompleted,
        ...(filterSearch
          ? {
              OR: [
                {
                  user: {
                    firstName: {
                      contains: filterSearch,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  user: {
                    lastName: {
                      contains: filterSearch,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  course: {
                    yaya: {
                      user: {
                        firstName: {
                          contains: filterSearch,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
                {
                  course: {
                    yaya: {
                      user: {
                        firstName: {
                          contains: filterSearch,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {}),
      },
      include: {
        course: {
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
                    phoneNumber: true,
                  },
                },
              },
            },
            lessons: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            image: true,
            phoneNumber: true,
          },
        },
      },
    });

    if (!courses) {
      throw new Error(
        "The specified course with the provided ID was not found in the database."
      );
    }

    return courses;
  } catch (error) {
    console.error("Error retrieving course:", error);
    throw new Error(
      "An unexpected error occurred while processing your request."
    );
  }
}

export async function getUserCoursePayments(
  userCourseId: string,
  mounth: number,
  price: number,
  courseCreateAt: Date
) {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userCourseId: userCourseId,
      },
      orderBy: {
        month: "asc",
      },
    });

    if (payments?.length > 0) {
      return payments;
    }

    if (payments?.length === 0 && mounth && price) {
      const datas = [];
      for (let i = 0; i < mounth; i++) {
        const data = {
          userCourseId: userCourseId,
          price: price,
          month: i + 1,
          limitDate: dayjs(courseCreateAt).add(i, "month").toDate(),
        };
        datas.push(data);
      }

      if (datas.length > 0) {
        const createPayments = await prisma.payment.createMany({
          data: datas,
        });

        if (createPayments) {
          const newPayments = await prisma.payment.findMany({
            where: {
              userCourseId: userCourseId,
            },
            orderBy: {
              month: "asc",
            },
          });
          return newPayments;
        }
      }

      throw new Error(
        "Error 500: An unexpected error occurred while processing your request."
      );
    }

    return [];
  } catch (error) {
    console.error("Error retrieving course:", error);
    throw new Error(
      "An unexpected error occurred while processing your request."
    );
  }
}

export async function updateUserCoursePayment(
  id: string,
  payBy: string,
  reference: string
) {
  try {
    const course = await prisma.payment.update({
      where: {
        id: id,
      },
      data: {
        isPaid: true,
        payBy: payBy,
        payAt: dayjs().toDate(),
        reference: reference,
      },
    });

    if (!course) {
      throw new Error(
        "The specified course with the provided ID was not found in the database."
      );
    }

    return course;
  } catch (error) {
    console.error("Error retrieving course:", error);
    throw new Error(
      "An unexpected error occurred while processing your request."
    );
  }
}
