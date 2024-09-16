import CryptoJS from "crypto-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.userCourse.deleteMany();
  await prisma.courses.deleteMany();
  await prisma.yaya.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "Développement Personnel" },
      { name: "Technologie" },
      { name: "Santé et Bien-être" },
      { name: "Arts et Loisirs" },
      { name: "Affaires" },
    ],
  });

  const saltedPassword = saltPassword("123456");
  const hash = saltedPassword.hash;
  const salt = saltedPassword.salt;

  const sameInfos = {
    password: hash,
    salt: salt,
    municipality: "Ngaliema",
    district: "Kingu",
    avenue: "Mbaki",
    number: "1",
    phoneNumber: "0612345678",
  };

  await prisma.user.createMany({
    data: [
      {
        name: "alice",
        firstName: "Alice",
        lastName: "Dupont",
        email: "alice@example.com",
        role: "TRAINER",
        isTrainerValidated: true,
        ...sameInfos,
      },
      {
        name: "bob",
        firstName: "Bob",
        lastName: "Martin",
        email: "bob@example.com",
        role: "ADMIN",
        ...sameInfos,
      },
      {
        name: "charlie",
        firstName: "Charlie",
        lastName: "Durand",
        email: "charlie@example.com",
        ...sameInfos,
      },
      {
        name: "diane",
        firstName: "Diane",
        lastName: "Petit",
        email: "diane@example.com",
        ...sameInfos,
      },
      {
        name: "eve",
        firstName: "Eve",
        lastName: "Lefevre",
        email: "eve@example.com",
        ...sameInfos,
      },
    ],
  });

  await prisma.yaya.createMany({
    data: [
      {
        userId: (
          await prisma.user.findFirst({ where: { email: "alice@example.com" } })
        ).id,
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        userId: (
          await prisma.user.findFirst({ where: { email: "bob@example.com" } })
        ).id,
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        userId: (
          await prisma.user.findFirst({
            where: { email: "charlie@example.com" },
          })
        ).id,
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        userId: (
          await prisma.user.findFirst({ where: { email: "diane@example.com" } })
        ).id,
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        userId: (
          await prisma.user.findFirst({ where: { email: "eve@example.com" } })
        ).id,
        status: "PENDING",
        createdAt: new Date(),
      },
    ],
  });

  await prisma.courses.createMany({
    data: [
      {
        title: "Cours de Gestion du Temps",
        description: "Apprenez à gérer votre temps efficacement.",
        monthlyPrice: 29.99,
        yayaID: (
          await prisma.yaya.findFirst({ where: { user: { name: "alice" } } })
        ).id,
        type: "ONLINE",
        status: "APPROVED",
        cover: "https://placehold.co/1920x1080/blue/white?text=cover",
        videoUrl: "https://www.youtube.com/watch?v=ejFsz3T6DUk",
        categoryId: await prisma.category.findMany().then((res) => res[0].id),
        duration: 2,
      },
      {
        title: "Introduction à la Programmation",
        description: "Un cours pour débutants sur la programmation.",
        monthlyPrice: 49.99,
        yayaID: (
          await prisma.yaya.findFirst({ where: { user: { name: "alice" } } })
        ).id,
        type: "DOMICILE",
        status: "APPROVED",
        cover: "https://placehold.co/1920x1080/green/white?text=cover",
        categoryId: await prisma.category.findMany().then((res) => res[0].id),
        duration: 6,
      },
      {
        title: "Yoga pour Débutants",
        description: "Découvrez les bases du yoga.",
        monthlyPrice: 19.99,
        yayaID: (
          await prisma.yaya.findFirst({ where: { user: { name: "alice" } } })
        ).id,
        type: "ONSITE",
        status: "PENDING",
        categoryId: await prisma.category.findMany().then((res) => res[1].id),
        duration: 12,
      },
      {
        title: "Peinture Acrylique",
        description: "Apprenez les techniques de peinture acrylique.",
        monthlyPrice: 39.99,
        yayaID: (
          await prisma.yaya.findFirst({ where: { user: { name: "alice" } } })
        ).id,
        type: "ONLINE",
        status: "PENDING",
        categoryId: await prisma.category.findMany().then((res) => res[2].id),
        duration: 8,
      },
      {
        title: "Stratégies d'Affaires",
        description: "Développez des stratégies pour réussir en affaires.",
        monthlyPrice: 59.99,
        yayaID: (
          await prisma.yaya.findFirst({ where: { user: { name: "alice" } } })
        ).id,
        type: "DOMICILE",
        status: "REJECTED",
        categoryId: await prisma.category.findMany().then((res) => res[3].id),
        duration: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

interface HashedPassword {
  hash: string;
  salt: string;
}

function saltPassword(password: string): HashedPassword {
  // Check if the password is empty
  if (!password) {
    throw new Error("Password cannot be empty");
  }

  // Generate a random salt if not provided
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  // Hash password with salt
  const saltedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  });

  // Convert to hex string
  const hash = saltedPassword.toString(CryptoJS.enc.Hex);

  // Return hash and salt
  return {
    hash,
    salt: salt.toString(CryptoJS.enc.Hex),
  };
}
