"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import MonyayaWhite from "../../../../public/Monyaya_white.png";
import Image from "next/image";
import {
  Company,
  MainRoutes,
  SocialNetworks,
} from "@/lib/page-routes/page-routes";
import Link from "next/link";
import logo from "../../../../public/Monyaya_white.png";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import UseLoading from "@/hooks/use-loading";
import { ContactFormFieldsType } from "@/types/forms";
import { CopyrightIcon } from "lucide-react";

export const Footer = () => {
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof ContactFormFieldsType>>({
    resolver: zodResolver(ContactFormFieldsType),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ContactFormFieldsType>) {
    startLoading();
    const { email, message } = values;

    const contact = await fetch("/api/contact", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
      }),
    });

    if (contact.status === 200) {
      toast({
        variant: "success",
        title: "Message envoyé",
        description: (
          <Typography component="p" variant="body-sm">
            Message envoyé avec succès
          </Typography>
        ),
      });
      stopLoading();
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue. Veuillez réessayer.
          </Typography>
        ),
      });
      stopLoading();
    }
  }

  return (
    <footer className=" bg-primary-400 text-white z-10 flex flex-col justify-between items-center">
      <Container className="flex gap-16 flex-col md:flex-row justify-between items-start md: py-16  md:py-16">
      <Container className="w-full md:w-[30vw]">
        <Image src={logo} alt="logo moyaya" width={50} height={50}/>
        <Typography className="">
          Explorez une approche transformative du développement 
          des compétences sur notre plateforme d'apprentissage.
        </Typography>
      </Container>
      <Container className="flex flex-col gap-4">
    <Typography variant="title-sm">Pages</Typography>
    <Container className="flex flex-col gap-1">
      {MainRoutes.map(({ title, baseUrl }) => (
        <Typography key={title}>
          <Link href={baseUrl!}>{title}</Link>
        </Typography>
      ))}
    </Container>
  </Container>
  <Container className="flex flex-col gap-4">
    <Typography variant="title-sm">Monyaya</Typography>
    <Container className="flex flex-col gap-1">
      {Company.map(({ title, baseUrl }) => (
        <Typography key={title}>
          <Link href={baseUrl!}>{title}</Link>
        </Typography>
      ))}
    </Container>
  </Container>
  <Container className="flex flex-col gap-4">
      <Typography variant="title-sm">Contact</Typography>
      <Container className="flex flex-col gap-1">
        <Typography>+243 997 724 968</Typography>
        <Typography>+243 821 611 703</Typography>
        <Typography>...</Typography>
      </Container>
    </Container>
    <Container className="flex flex-col gap-8">
    <Container className="flex flex-col gap-4">
      <Typography variant="title-sm">Réseaux sociaux</Typography>
      <Container className="flex flex-row gap-4">
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
      </Container>
    </Container>
  </Container>
  </Container>
  <Container className="flex flex-row justify-center items-center gap-4 w-4/5 py-4 border-t-2 border-primary-50 ">
        <CopyrightIcon /> 
        <Typography variant="body-sm">2024 MonYaya. Tous droits réservés.</Typography>
  </Container>

    </footer>
  );
};