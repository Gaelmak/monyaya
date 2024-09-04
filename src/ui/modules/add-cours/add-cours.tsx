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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UseLoading from "@/hooks/use-loading";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";
import { Options } from "@/types/options";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import DefaultAvatar from "../../../../public/default_avatar.jpg";
import { TypeCourses } from "@/lib/types-courses/types-courses";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  options: Options[];
  userId: string;
}

export const AddCours = ({ options, userId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Ajout d'image pour le cours
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

  const { control } = form;

  //gestion de chapitre ou lessons
  // const { fields, append, remove } = useFieldArray({
  //   name: "chapters",
  //   control,
  // });

  //definir d'abord comment les lessons doivent etre ajouter
  /* async function onSubmit(values: z.infer<typeof NewTrainingFormFieldsType>) {
    startLoading();
    const { training_name, training_description, chapters, price, category } =
      values;

    const formData = new FormData();
    formData.append("file", selectedImage!);
    formData.append("name", userId + "_" + training_name);
    formData.append("folder", "Trainings");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status === 200) {
        const url = data.fileUrl;
        const addTraining = await fetch(`/api/training`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            training_name,
            training_description,
            chapters,
            price,
            category,
            image: url,
          }),
        });

        if (addTraining.status === 200) {
          toast({
            variant: "success",
            title: "Youpi !",
            description: (
              <Typography component="p" variant="body-sm">
                Votre formation a été ajoutée avec succès
              </Typography>
            ),
          });
          stopLoading();
          router.push("/my-courses");
        } else {
          toast({
            variant: "destructive",
            title: "Erreur !",
            description: (
              <Typography component="p" variant="body-sm">
                Une erreur est survenue durant l'enregistrement de votre
                formation. Veuillez recommencer l'opération.
              </Typography>
            ),
          });
          stopLoading();
        }
      }
      stopLoading();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue, veuillez réessayer plus tard.
          </Typography>
        ),
      });
      setSelectedImage(null);
      stopLoading();
    }
  }*/

  return (
    <Container className="w-2/3 flex flex-col  m-auto">
      <Form {...form}>
        <form>
          <Container className="relative flex flex-col justify-center items-center w-full mb-5">
            <Container className="w-full h-[30vh] rounded overflow-hidden">
              <Image
                width={100}
                height={100}
                src={preview ? preview : DefaultAvatar}
                alt="User profile image"
                className="h-full w-full object-cover "
              />
            </Container>
            <Container className="absolute right-4 bottom-0 transform -translate-y-1/2 flex flex-col  lg:flex-row justify-between items-center">
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
          <Typography className="text-xl font-semibold">
            Ajouter un cours
          </Typography>
          <Card className="w-full mb-5 bg-white pt-3">
            <CardContent>
              <Typography
                variant="title-sm"
                component="h4"
                className="text-sm text-secondary-400 mb-1"
              >
                Titre
              </Typography>
              <InputField
                control={form.control}
                name="training_name"
                placeholder="Titre de votre formation"
              />
              <Typography
                variant="title-xs"
                component="h4"
                className=" text-sm text-secondary-400 mb-1"
              >
                Branche de votre formation
              </Typography>
              <InputFieldSelect
                control={form.control}
                name="category"
                options={options}
                placeholder="Selectionnez une branche pour votre formation"
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
                  <div className="relative ">
                    <InputField
                      control={form.control}
                      name="price"
                      placeholder="Ajouter le prix de votre formation"
                      description={"Dévise en dollar ($)"}
                      type="number"
                      className="w-full pr-16"
                    />
                    <span className="absolute right-4 top-1/3 transform -translate-y-1/2 text-gray-500">
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
          <Container className=" text-right mt-5">
            <Buttons
              type="submit"
              isLoading={isLoading}
              className="w-[15vw] text-right"
            >
              Créer la formation
            </Buttons>
          </Container>
        </form>
      </Form>
    </Container>
  );
};
