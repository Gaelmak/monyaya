"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputField } from "@/ui/components/input-field/input-field";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Cover from "../../../../public/form.jpg";
import Cover_v from "../../../../public/form_v.jpg";
import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Buttons } from "@/ui/components/buttons/buttons";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Mail, Phone, User, Home } from "lucide-react";
import { useEffect, useState } from "react";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { usePostHog } from "posthog-js/react";

// Schéma de validation Zod
const CompleteRegisterFormFieldsType = z.object({
  firstname: z.string().nonempty("Le prénom est requis"),
  lastname: z.string().nonempty("Le nom est requis"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phonenumber: z.string().nonempty("Le numéro de téléphone est requis"),
  avenue: z.string().nonempty("L'avenue est requise"),
  district: z.string().nonempty("Le quartier est requis"),
  municipality: z.string().nonempty("La commune est requise"),
  number: z.string().nonempty("Le numéro est requis"),
});

interface Props {
  data: {
    firstName: string | null;
    email: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    avenue: string | null;
    district: string | null;
    municipality: string | null;
    number: string | null;
  };
  name: string;
}

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BgImg className="h-[100vh] hidden lg:flex" src={Cover} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-[100vh] lg:hidden" src={Cover_v} alt="cover">
        {children}
      </BgImg>
    </>
  );
};

export const CompleteRegistration = ({ data, name }: Props) => {
  const router = useRouter();
  const posthog = usePostHog();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [isFirstFilled, setIsFirstFilled] = useState(false);
  const [isSecondFilled, setIsSecondFilled] = useState(false);
  const [isThirdFilled, setIsThirdFilled] = useState(false);

  const form = useForm<z.infer<typeof CompleteRegisterFormFieldsType>>({
    resolver: zodResolver(CompleteRegisterFormFieldsType),
    defaultValues: {
      firstname: data.firstName ? data.firstName : "",
      lastname: data.lastName ? data.lastName : "",
      email: data.email ? data.email : "",
      phonenumber: data.phoneNumber ? data.phoneNumber : "",
      avenue: data.avenue ? data.avenue : "",
      district: data.district ? data.district : "",
      municipality: data.municipality ? data.municipality : "",
      number: data.number ? data.number : "",
    },
  });

  // afficher une notification si il y a des erreurs dans les champs
  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        variant: "destructive",
        description: (
          <Typography component="p" variant="body-sm">
            Il y&apos;a des erreurs dans vos informations, veuillez vérifier
            votre saisie.
          </Typography>
        ),
      });
    }
  }, [form.formState.isSubmitting]); // eslint-disable-line

  useEffect(() => {
    const { firstname, lastname } = form.getValues();
    const isFilled = firstname.trim() !== "" && lastname.trim() !== "";
    setIsFirstFilled(isFilled);
  }, [form.getValues()]); // eslint-disable-line

  useEffect(() => {
    const { phonenumber, email } = form.getValues();
    const isFilled = phonenumber.trim() !== "" && email.trim() !== "";
    setIsSecondFilled(isFilled);
  }, [form.getValues()]); // eslint-disable-line

  useEffect(() => {
    const { avenue, district, municipality, number } = form.getValues();
    const isFilled =
      avenue.trim() !== "" &&
      district.trim() !== "" &&
      municipality.trim() !== "" &&
      number.trim() !== "";
    setIsThirdFilled(isFilled);
  }, [form.getValues()]); // eslint-disable-line

  async function onSubmit(
    values: z.infer<typeof CompleteRegisterFormFieldsType>
  ) {
    startLoading();

    const {
      firstname,
      lastname,
      email,
      phonenumber,
      avenue,
      district,
      municipality,
      number,
    } = values;
    const registration = await fetch(`/api/user/${name}/complete`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phonenumber,
        avenue,
        district,
        municipality,
        number,
      }),
    });

    if (registration.status === 200) {
      toast({
        variant: "success",
        title: "Bienvenue !",
        description: (
          <Typography component="p" variant="body-sm">
            Vos informations ont correctement été enregistré
          </Typography>
        ),
      });
      stopLoading();
      posthog.capture("user_signed_sucess", {
        $set: {
          name: `${data?.firstName} ${data?.lastName}`,
          email: data?.email,
        },
      });
      setTimeout(() => {
        signOut({ callbackUrl: "/signin" });
        // window.location.href = "/dashboard";
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: "Utilisateur déjà existant",
        description: (
          <Typography component="p" variant="body-sm">
            Veuillez utiliser un autre nom d’utilisateur
          </Typography>
        ),
      });
      stopLoading();
    }

    stopLoading();
  }

  const UserIcon = () => {
    return (
      <User className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const MailIcon = () => {
    return (
      <Mail className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const PhoneIcon = () => {
    return (
      <Phone className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const HomeIcon = () => {
    return (
      <Home className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  return (
    <BackgroundImage>
      <div className="bg-[#e7ffb5] lg:bg-transparent h-full w-full flex flex-col p-8 lg:justify-center gap-4">
        <Typography
          variant="title-lg"
          component="h2"
          className="text-center text-4xl font-bold md:text-left"
        >
          Terminer l&apos;inscription
        </Typography>
        <div className="w-full lg:w-[50vw]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={clsx("flex flex-col gap-8 ")}
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="step-1">
                  <AccordionTrigger>
                    <div className="flex flex-row gap-4 justify-center">
                      <Typography variant="title-base">Identité</Typography>
                      <CheckCircle2
                        className={clsx(
                          isFirstFilled
                            ? "text-primary-Default"
                            : "text-gray-100"
                        )}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 px-1">
                      <div>
                        <Typography variant="body-sm">
                          Bienvenue à la section des informations personnelles.
                          Ici, nous allons recueillir des informations de base
                          vous concernant. Veuillez fournir les détails
                          nécessaires afin de continuer avec le formulaire.
                        </Typography>
                      </div>
                      <div
                        className={clsx(
                          "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
                        )}
                      >
                        <div className="lg:basis-1/2">
                          <InputField
                            placeholder="John"
                            control={form.control}
                            name="firstname"
                            label="Prénom"
                            className="bg-transparent"
                          >
                            {UserIcon()}
                          </InputField>
                        </div>
                        <div className="lg:basis-1/2">
                          <InputField
                            placeholder="Doe"
                            control={form.control}
                            name="lastname"
                            label="Nom"
                            className="bg-transparent"
                          >
                            {UserIcon()}
                          </InputField>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step-2" disabled={!isFirstFilled}>
                  <AccordionTrigger>
                    <div className="flex flex-row gap-4 justify-center">
                      <Typography variant="title-base">Coordonnées</Typography>
                      <CheckCircle2
                        className={clsx(
                          isSecondFilled
                            ? "text-primary-Default"
                            : "text-gray-100"
                        )}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 px-1">
                      <div>
                        <Typography variant="body-sm">
                          Pour nous permettre de vous contacter facilement, nous
                          avons besoin de vos coordonnées complètes. Ces
                          informations resteront confidentielles et ne seront
                          utilisées que pour des fins de communication.
                        </Typography>
                      </div>
                      <div
                        className={clsx(
                          "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
                        )}
                      >
                        <div className="lg:basis-1/2">
                          <InputField
                            placeholder="JohnDoe12@jd.com"
                            control={form.control}
                            name="email"
                            type="email"
                            label="Adresse email"
                            className="bg-transparent"
                          >
                            {MailIcon()}
                          </InputField>
                        </div>
                        <div className="lg:basis-1/2">
                          <InputField
                            placeholder="0*********"
                            control={form.control}
                            name="phonenumber"
                            label="Numéro de téléphone"
                            className="bg-transparent"
                          >
                            {PhoneIcon()}
                          </InputField>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="step-3"
                  disabled={isFirstFilled && isSecondFilled ? false : true}
                >
                  <AccordionTrigger>
                    <div className="flex flex-row gap-4 justify-center">
                      <Typography variant="title-base">
                        Adresse Physique
                      </Typography>
                      <CheckCircle2
                        className={clsx(
                          isThirdFilled
                            ? "text-primary-Default"
                            : "text-gray-100"
                        )}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 px-1">
                      <div>
                        <Typography variant="body-sm">
                          Nous avons besoin de votre adresse physique pour des
                          raisons administratives. Veuillez entrer votre adresse
                          complète et exacte.
                        </Typography>
                      </div>
                      <div
                        className={clsx(
                          "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
                        )}
                      >
                        <div className="lg:basis-1/2">
                          <InputField
                            control={form.control}
                            name="municipality"
                            placeholder="Commune"
                            label="Commune"
                            className="bg-transparent"
                          >
                            {HomeIcon()}
                          </InputField>
                          <InputField
                            control={form.control}
                            name="district"
                            placeholder="Quartier"
                            label="Quartier"
                            className="bg-transparent"
                          >
                            {HomeIcon()}
                          </InputField>
                        </div>
                        <div className="lg:basis-1/2">
                          <InputField
                            control={form.control}
                            name="avenue"
                            placeholder="Avenue"
                            label="Avenue"
                            className="bg-transparent"
                          >
                            {HomeIcon()}
                          </InputField>
                          <InputField
                            control={form.control}
                            name="number"
                            placeholder="Numéro"
                            label="Numéro"
                            className="bg-transparent"
                          >
                            {HomeIcon()}
                          </InputField>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-col justify-between items-center lg:items-start gap-2">
                <Buttons
                  type="submit"
                  isLoading={isLoading}
                  disabled={
                    isFirstFilled && isSecondFilled && isThirdFilled
                      ? false
                      : true
                  }
                >
                  Enregistrer
                </Buttons>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </BackgroundImage>
  );
};
