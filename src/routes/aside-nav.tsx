import { Container } from "@/ui/components/container/container";
import { AsideActiveLink } from "./aside-active-link";
import { AsideRoutes, HomeRoute } from "@/lib/page-routes/page-routes";
import { Typography } from "@/ui/components/typography/typography";
import { SignOutButton } from "./auth-buttons";
import Image from "next/image";
import DefaultAvatar from "../../public/default_avatar.jpg";
import { Archive, UserRoundPlus } from "lucide-react";
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
    select: {
      role: true,
      name: true,
      image: true,
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
          <Container>
            <Container className="flex items-start rounded-full w-[180px] h-[180px] overflow-hidden">
              <Image
                width={240}
                height={240}
                className="w-full h-full object-cover"
                src={user!.image ? user!.image : DefaultAvatar}
                alt="User profile image"
              />
            </Container>
          </Container>
        </Container>
        <Container className="pt-4">
          {AsideRoutes.map(({ children }) =>
            children!.map(({ title, baseUrl, Icon }) => (
              <Container key={title}>
                <Typography
                  variant="body-base"
                  component="p"
                  className="w-full text-black/60"
                >
                  <AsideActiveLink href={baseUrl!}>
                    {Icon ? (
                      <span className="flex flex-row items-center">
                        <Icon className="mr-4 h-5 w-5" />
                        {title}
                      </span>
                    ) : (
                      <>{title}</>
                    )}
                  </AsideActiveLink>
                </Typography>
              </Container>
            ))
          )}
        </Container>
      </Container>
      <Container className="md:p-4">
        {user!.role === "USER" ? (
          <Container>
            <Typography
              variant="body-base"
              component="p"
              className="w-full text-black/60"
            >
              <AsideActiveLink href={"/become-a-trainer"}>
                <span className="flex flex-row items-center">
                  <UserRoundPlus className="mr-4 h-5 w-5" />
                  Devenir formateur
                </span>
              </AsideActiveLink>
            </Typography>
          </Container>
        ) : (
          <Container>
            <Typography
              variant="body-base"
              component="p"
              className="w-full text-black/60"
            >
              <AsideActiveLink href={"/my-trainings"}>
                <span className="flex flex-row items-center">
                  <Archive className="mr-4 h-5 w-5" />
                  Mes formations
                </span>
              </AsideActiveLink>
            </Typography>
          </Container>
        )}
        {HomeRoute.map(({ title, baseUrl, Icon }) => (
          <Container key={title}>
            <Typography
              variant="body-base"
              component="p"
              className="w-full text-black/60"
            >
              <AsideActiveLink href={baseUrl!}>
                {Icon ? (
                  <span className="flex flex-row items-center">
                    <Icon className="mr-4 h-5 w-5" />
                    {title}
                  </span>
                ) : (
                  <>{title}</>
                )}
              </AsideActiveLink>
            </Typography>
          </Container>
        ))}
        <SignOutButton className="bg-white md:bg-slate-50 text-red-400 hover:bg-white md:hover:bg-slate-50 hover:text-red-500 justify-start p-2 w-full" />
      </Container>
    </Container>
  );
};
