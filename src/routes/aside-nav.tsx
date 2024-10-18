import { Container } from "@/ui/components/container/container";
import { AsideActiveLink } from "./aside-active-link";
import { HomeRoute } from "@/lib/page-routes/page-routes";
import { Typography } from "@/ui/components/typography/typography";
import { SignOutButton } from "./auth-buttons";
import Image from "next/image";
import DefaultAvatar from "../../public/default_avatar.jpg";
import {
  Archive,
  Book,
  Home,
  Plus,
  Presentation,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import prisma from "@/lib/prisma";
import clsx from "clsx";
import { userAuth } from "@/lib/helper";

interface Props {
  className?: string;
}

export const AsideNav = async ({ className }: Props) => {
  const session = await userAuth();
  const user = await prisma?.user.findUnique({
    where: {
      name: session!.name!,
    },
  });

  return (
    <Container
      className={clsx(
        "h-full w-full flex flex-col justify-between bg-white",
        className
      )}
    >
      <Container className="w-full md:p-4">
        <Container className="items-center w-full flex justify-center flex-row gap-2 pb-4">
          <Container className="flex items-center gap-2 w-full">
            <Container className="flex items-start rounded-full max-w-14 max-h-14 overflow-hidden aspect-square">
              <Image
                width={40}
                height={40}
                className="w-full h-full object-cover"
                src={user?.image ? user?.image : DefaultAvatar}
                alt="User profile image"
              />
            </Container>
            <Container className="flex flex-col w-full">
              <Typography className="text-[15px] font-bold">
                {user?.firstName && user?.lastName
                  ? `${user?.firstName} ${user?.lastName}`
                  : user?.name}
              </Typography>
              <div className="flex flex-row gap-2 justify-between w-full items-center text-sm -mt-1">
                <Typography variant="body-sm">@{user?.name}</Typography>
                {user?.role === "TRAINER" && (
                  <Typography className="py-1 px-2 rounded-full bg-primary-600 text-white text-[10px]">
                    yaya
                  </Typography>
                )}
                {user?.role === "ADMIN" && (
                  <Typography className="py-1 px-2 rounded-full bg-primary-600 text-white text-[10px]">
                    Admin
                  </Typography>
                )}
              </div>
            </Container>
          </Container>
        </Container>
        <Container className="pt-4">
          <Container>
            <Typography
              variant="body-base"
              component="p"
              className="w-full text-black/60 space-y-2"
            >
              <AsideActiveLink
                href="/dashboard"
                className="flex flex-row items-center gap-2"
              >
                <Presentation className="h-5 w-5" />
                Tableau de bord
              </AsideActiveLink>

              {user?.role != "ADMIN" && (
                <AsideActiveLink
                  href="/my-courses"
                  className="flex flex-row items-center gap-2"
                >
                  <Book className="h-5 w-5" />
                  {user?.role === "TRAINER" ? "Mes formations" : "Mes cours"}
                </AsideActiveLink>
              )}

              {user?.role === "USER" && (
                <AsideActiveLink
                  href="/courses"
                  className="flex flex-row items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Nouvelle formation
                </AsideActiveLink>
              )}

              {user?.role === "ADMIN" && (
                <>
                  <AsideActiveLink
                    href="/admin-courses"
                    className="flex flex-row items-center gap-2"
                  >
                    <Book className="h-5 w-5" />
                    Cours
                  </AsideActiveLink>
                  <AsideActiveLink
                    href="/to-review"
                    className="flex flex-row items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />A valider
                  </AsideActiveLink>
                </>
              )}
            </Typography>
          </Container>
        </Container>
      </Container>
      <Container className="md:p-4">
        <Typography
          variant="body-base"
          component="p"
          className="w-full text-black/60 space-y-2"
        >
          <AsideActiveLink
            href="/setting"
            className="flex flex-row items-center gap-2"
          >
            <Settings className="h-5 w-5" />
            Mon compte
          </AsideActiveLink>
          {user?.role === "USER" && (
            <AsideActiveLink href={"/become-a-trainer"}>
              <span className="flex flex-row items-center gap-2">
                <UserRoundPlus className="h-5 w-5" />
                Devenir formateur
              </span>
            </AsideActiveLink>
          )}
          <AsideActiveLink
            href="/"
            className="flex flex-row items-center gap-2"
          >
            <Home className="h-5 w-5" />
            Retourner à l&apos;accueil
          </AsideActiveLink>
        </Typography>
        <SignOutButton className="bg-white md:bg-slate-50 text-red-400 hover:bg-white md:hover:bg-slate-50 hover:text-red-500 justify-start p-2 w-full" />
      </Container>
    </Container>
  );
};
