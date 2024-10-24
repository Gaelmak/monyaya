"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import {
  Company,
  MainRoutes,
  SocialNetworks,
} from "@/lib/page-routes/page-routes";
import Link from "next/link";
import { CopyrightIcon } from "lucide-react";

export const Footer = () => {
  return (
    <footer className=" bg-primary-400 text-white z-10 flex flex-col items-center w-full">
      <Container className="w-11/12 flex flex-wrap gap-6 md:flex-row justify-between items-center  md:py-16">
        <div className="w-full md:w-[20vw] pb-3 md:pb-0">
          <Image
            src="/img/monyaya-favicon.webp"
            alt="logo moyaya"
            width={200}
            height={200}
            className="h-12 w-auto"
          />
          <Typography className="">
            Explorez une approche transformative du développement des
            compétences sur notre plateforme d&apos;apprentissage.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3 flex-row justify-between md:w-2/3">
          <div className="flex flex-col gap-4 w-auto">
            <Typography className="text-lg">Pages</Typography>
            <div className="flex flex-col gap-1">
              {MainRoutes.map(({ title, baseUrl }) => (
                <Typography key={title}>
                  <Link href={baseUrl!}>{title}</Link>
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-auto">
            <Typography className="text-lg">Monyaya</Typography>
            <div className="flex flex-col gap-1">
              {Company.map(({ title, baseUrl }) => (
                <Typography key={title}>
                  <Link href={baseUrl!}>{title}</Link>
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-auto pt-4">
            <Typography className="text-lg">Contact</Typography>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <a href="tel:+243821611703">+243 821 611 703</a>
                <a href="tel:+243997724968">+243 997 724 968</a>
                <a href="mailto:monyayaofficiel@gmail.com">
                  monyayaofficiel@gmail.com
                </a>
              </div>
              <div className="flex flex-row gap-4 pb-6 ">
                {SocialNetworks.map(({ CustomIcon, baseUrl, title }) => (
                  <Link href={baseUrl!} key={title}>
                    <Image
                      src={CustomIcon!}
                      alt={title}
                      width={28}
                      height={28}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="w-11/12 flex flex-row justify-center items-center gap-4 py-4 border-t border-primary-50/80 ">
        <Typography variant="body-sm" className="text-xs">
          © 2024 Monyaya. Tous droits réservés.
        </Typography>
      </Container>
    </footer>
  );
};
