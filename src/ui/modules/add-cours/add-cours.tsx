"use client";

import { Container } from "@/ui/components/container/container";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { NewTrainingFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Buttons } from "@/ui/components/buttons/buttons";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";
import { Options } from "@/types/options";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import DefaultAvatar from "../../../../public/default_avatar.jpg";
import { TypeCourses } from "@/lib/types-courses/types-courses";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  options: Options[];
  userId: string;
}

export const AddCours = ({ options, userId }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof NewTrainingFormFieldsType>>({
    resolver: zodResolver(NewTrainingFormFieldsType),
    defaultValues: {
      training_name: "",
      training_description: "",
      chapters: [{ title: "", description: "" }],
      price: 0,
      category: "",
    },
  });

  // Fonction pour gérer le changement d'image
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  return (
    <Container className="w-2/3 flex flex-col m-auto">
      <Form {...form}>
        <form>
          {/* Section pour l'image */}
          <Container className="relative flex flex-col justify-center items-center w-full mb-5">
            <Container className="w-full h-[30vh] rounded overflow-hidden">
              {/* N'afficher l'image que lorsque le composant est rendu côté client */}
              {isClient && (
                <Image
                  width={100}
                  height={100}
                  src={preview ? preview : DefaultAvatar}
                  alt="User profile image"
                  className="h-full w-full object-cover"
                />
              )}
            </Container>
            <Container className="absolute right-4 bottom-0 transform -translate-y-1/2 flex flex-col lg:flex-row justify-between items-center">
              <label
                htmlFor="profil"
                className="cursor-pointer text-gray-500 hover:text-primary-Default animate bg-slate-50 px-4 py-2 rounded"
              >
                Ajouter une image
              </label>
              <input
                type="file"
                accept="image/*"
                id="profil"
                onChange={handleImageChange}
                className="hidden"
              />
            </Container>
          </Container>
          <div className="flex flex-col gap-5">
            <InputField
              control={form.control}
              name="training_name"
              placeholder="Titre de votre formation"
              className="border-none bg-transparent focus:bg-transparent focus:ring-transparent placeholder:text-secondary-400 placeholder:text-3xl text-3xl text-secondary-400"
            />

            <Card className="w-full bg-white pt-3">
              <CardContent>
                <Typography
                  variant="title-xs"
                  component="h4"
                  className="text-sm text-secondary-400 mb-1"
                >
                  Branche de votre formation
                </Typography>
                <InputFieldSelect
                  control={form.control}
                  name="category"
                  options={options}
                  placeholder="Sélectionnez une branche pour votre formation"
                />
                <Container className="flex flex-row justify-between gap-4 items-start">
                  <Container className="w-[27vw]">
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="text-sm text-secondary-400 mb-1"
                    >
                      Prix
                    </Typography>
                    <div className="relative">
                      <InputField
                        control={form.control}
                        name="price"
                        placeholder="Ajouter le prix de votre formation"
                        type="number"
                        className="w-full pr-16"
                      />
                      <span className="absolute right-4 top-[4vh] transform -translate-y-1/2 text-gray-500">
                        /mois
                      </span>
                    </div>
                  </Container>
                  <Container className="w-[27vw]">
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="text-sm text-secondary-400 mb-1"
                    >
                      Type de formation
                    </Typography>
                    <InputFieldSelect
                      control={form.control}
                      name="category"
                      options={TypeCourses}
                      placeholder="Type de votre formation"
                    />
                  </Container>
                </Container>
              </CardContent>
            </Card>

            <Textarea placeholder="Description..." />
          </div>

          {/* Bouton pour créer la formation */}
          <Container className="text-right mt-5 bg-pr">
            <AlertDialog>
              <AlertDialogTrigger>
                <Buttons className="w-[15vw] text-right">
                  Créer la formation
                </Buttons>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-primary-50">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Etes vous sur de creer ce cours ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    En créant ce cours, vous acceptez toutes nos conditions et
                    règles..
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction className="bg-primary-600 hover:bg-primary-400">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Container>
        </form>
      </Form>
    </Container>
  );
};
