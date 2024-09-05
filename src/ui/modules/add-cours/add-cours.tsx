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
  // const router = useRouter();
  // const { toast } = useToast();
  // const [isLoading, startLoading, stopLoading] = UseLoading();
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
          <div className="flex flex-col gap-5">
            <div className="">
              <InputField
                control={form.control}
                name="training_name"
                placeholder="Titre de votre formation"
                className="border-none bg-transparent active:bg-transparent focus:bg-transparent focus:border-none active:border-none focus:ring-transparent active:ring-transparent ring-offset-transparent placeholder:text-secondary-400 placeholder:text-3xl text-3xl text-secondary-400 "
              />
            </div>
            <Card className="w-full  bg-white pt-3">
              <CardContent>
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
          </div>
          <Container className=" text-right mt-5 bg-pr">
            <AlertDialog>
              <AlertDialogTrigger>
                <Buttons className="w-[15vw] text-right">
                  Créer la formation
                </Buttons>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-primary-50">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-primary-600 hover:bg-primary-400 ">
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
