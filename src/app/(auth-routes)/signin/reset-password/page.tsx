import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { BackButton } from "@/ui/components/back-button/back-button";
import { PasswordChangeForm } from "../password-change-form";
import { SirenIcon } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function SignIn({
  searchParams,
}: {
  searchParams: {
    token: string;
    email: string;
  };
}) {
  const autorisation = await prisma.verificationToken.findUnique({
    where: {
      token: searchParams.token,
      identifier: searchParams.email,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!autorisation) {
    return (
      <Container className="bg-white relative md:h-[100dvh] flex justify-center items-center">
        <Container className="md:w-[30vw] flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center justify-end items-center">
            <SirenIcon
              size={80}
              strokeWidth={1}
              className="mb-2 text-red-600"
            />
            <Typography
              variant="title-lg"
              component="h2"
              className="text-2xl font-semibold"
            >
              Action non autorisée
            </Typography>
            <Typography variant="body-base" component="p">
              Le token que vous avez utilisé est soit invalide, soit a expiré.
              Veuillez vérifier le lien dans votre email et réessayer ou
              rependre l&apos;etape de mot de passe oublié ou encore{" "}
              <Link
                href="/contact"
                className="text-primary-600 hover:text-primary-700"
              >
                contactez-nous
              </Link>
              .
            </Typography>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <Container className="bg-primary-600 relative md:h-[100dvh] flex justify-center items-center">
      <Container className="absolute top-8 left-8 z-10">
        <BackButton
          icon="home"
          backTo="/"
          className="bg-white text-primary-600 hover:bg-white/90"
        />
      </Container>
      <Container className="md:w-[30vw] flex flex-col gap-8 bg-white p-8 rounded shadow-sm">
        <div className="flex flex-col gap-2 ">
          <Typography
            variant="title-lg"
            component="h2"
            className="text-2xl font-semibold"
          >
            Mot de passe
          </Typography>
          <Typography variant="body-base" component="p">
            Vous pouvez maintenant changer votre mot de passe
          </Typography>
        </div>
        <div className="w-full px-2">
          <PasswordChangeForm
            token={searchParams.email}
            email={searchParams.email}
          />
        </div>
      </Container>
    </Container>
  );
}
