"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputField } from "@/ui/components/input-field/input-field";
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
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

// Schéma de validation Zod
const CompleteRegisterFormFieldsType = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phonenumber: z.string().regex(/^\+\d{2,3}\d{9}$/, {
    message:
      "Veuillez entrer un numéro de téléphone valide avec l'indicatif du pays (ex: +2438XXXXXXXX ou +336XXXXXXXX)",
  }),
  avenue: z.string().min(1, "L'avenue est requise"),
  district: z.string().min(1, "Le quartier est requis"),
  municipality: z.string().min(1, "La commune est requise"),
  number: z.string().min(1, "Le numéro est requis"),
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
  onReturn: () => void;
  onComplete: () => void;
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

export const CompleteRegistration = ({ data, name, onReturn }: Props) => {
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
      firstname: data.firstName ?? "",
      lastname: data.lastName ?? "",
      email: data.email ?? "",
      phonenumber: data.phoneNumber ?? "",
      avenue: data.avenue ?? "",
      district: data.district ?? "",
      municipality: data.municipality ?? "",
      number: data.number ?? "",
    },
  });

  // afficher une notification si il y a des erreurs dans les champs
  useEffect(() => {
    const errors = Object.keys(form.formState.errors);
    if (errors.length > 0) {
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
    const subscription = form.watch((values) => {
      setIsFirstFilled(
        (values.firstname?.trim() ?? "") !== "" &&
          (values.lastname?.trim() ?? "") !== ""
      );
      setIsSecondFilled(
        (values.phonenumber?.trim() ?? "") !== "" &&
          (values.email?.trim() ?? "") !== ""
      );
      setIsThirdFilled(
        (values.avenue?.trim() ?? "") !== "" &&
          (values.district?.trim() ?? "") !== "" &&
          (values.municipality?.trim() ?? "") !== "" &&
          (values.number?.trim() ?? "") !== ""
      );
    });
    // Initial check on mount
    const initialValues = form.getValues();
    setIsFirstFilled(
      (initialValues.firstname?.trim() ?? "") !== "" &&
        (initialValues.lastname?.trim() ?? "") !== ""
    );
    setIsSecondFilled(
      (initialValues.phonenumber?.trim() ?? "") !== "" &&
        (initialValues.email?.trim() ?? "") !== ""
    );
    setIsThirdFilled(
      (initialValues.avenue?.trim() ?? "") !== "" &&
        (initialValues.district?.trim() ?? "") !== "" &&
        (initialValues.municipality?.trim() ?? "") !== "" &&
        (initialValues.number?.trim() ?? "") !== ""
    );
    return () => subscription.unsubscribe();
  }, [form]);

  const completeRegistrationMutation = useMutation({
    mutationFn: async (
      values: z.infer<typeof CompleteRegisterFormFieldsType>
    ) => {
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
      const res = await fetch(`/api/user/${name}/complete`, {
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
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || "Erreur lors de l'inscription");
      }
      return res.json();
    },
    onSuccess: () => {
      posthog.capture("user_signed_sucess", {
        $set: {
          name: `${data?.firstName} ${data?.lastName}`,
          email: data?.email,
        },
      });
      toast({
        variant: "success",
        title: "Bienvenue !",
        description: (
          <Typography component="p" variant="body-sm">
            Vos informations ont correctement été enregistré
          </Typography>
        ),
      });
      setTimeout(() => {
        signOut({ callbackUrl: "/signin" });
      }, 1000);
      stopLoading();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: (
          <Typography component="p" variant="body-sm">
            {error.message}
          </Typography>
        ),
      });
      stopLoading();
    },
  });

  async function onSubmit(
    values: z.infer<typeof CompleteRegisterFormFieldsType>
  ) {
    startLoading();
    await completeRegistrationMutation.mutateAsync(values);
    stopLoading();
  }

  return (
    <BackgroundImage>
      <div className="bg-[#e7ffb5] lg:bg-transparent h-full overflow-y-scroll w-full flex flex-col p-8 lg:justify-center gap-4">
        <div className="w-full lg:w-[50vw] my-20">
          <Typography
            variant="title-lg"
            component="h2"
            className="text-center text-4xl font-bold md:text-left mb-8"
          >
            Terminer l&apos;inscription
          </Typography>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={clsx("flex flex-col gap-8 ")}
            >
              <Accordion type="multiple">
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
                            placeholder="+243*********"
                            control={form.control}
                            name="phonenumber"
                            label="Numéro de téléphone (WhastApp)"
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
              <div className="flex justify-between items-center lg:items-start gap-2">
                <Button
                  variant="link"
                  type="button"
                  className="px-0"
                  onClick={onReturn}
                >
                  Précédent
                </Button>
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
