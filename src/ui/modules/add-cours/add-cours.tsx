"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container } from "@/ui/components/container/container";
import { Form, FormMessage } from "@/components/ui/form";
import { NewCourseFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Buttons } from "@/ui/components/buttons/buttons";
import { InputFieldSelect } from "@/ui/components/input-field-select/input-field-select";
import { OptionsTypes } from "@/types/options";
import { useState, ChangeEvent, useEffect, use } from "react";
import Image from "next/image";
import DefaultAvatar from "../../../../public/default_avatar.jpg";
import { TypeCourses } from "@/lib/types-courses/types-courses";
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
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ImageDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Category, Courses } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  categories: OptionsTypes[];
  userId: string | undefined;
  course?: (Courses & { category: Category | null }) | null;
}

export const AddCours = ({ categories, userId, course }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [descFromEditor, setDescFromEditor] = useState<any>(null);
  const [confirmPop, setConfirmPop] = useState(false);
  const router = useRouter();

  const categoriesMerged = Array.isArray(categories)
    ? [{ id: "none", name: "Pas de catégorie" }, ...categories]
    : categories;

  useEffect(() => {
    if (course) {
      setDescFromEditor(course?.description);
    }
  }, [course]);

  const form = useForm<z.infer<typeof NewCourseFormFieldsType>>({
    resolver: zodResolver(NewCourseFormFieldsType),
    defaultValues: {
      title: course?.title ?? "",
      description: descFromEditor ?? "",
      price: course?.monthlyPrice ?? 0,
      duration: course?.duration ?? 0,
      type: course?.type.toLowerCase() ?? "online",
      category: course?.category ? course?.category?.name : "none",
      videoUrl: course?.videoUrl ?? "",
      cover: course?.cover ?? "",
    },
  });

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

  const { mutateAsync: postCourse, isPending } = useMutation({
    mutationKey: ["postCourse"],
    mutationFn: async (values: z.infer<typeof NewCourseFormFieldsType>) => {
      const data = {
        title: values.title,
        description: values.description,
        monthlyPrice: values.price,
        duration: values.duration,
        category: values.category,
        videoUrl: values.videoUrl,
        cover: values.cover,
      };

      const res = course
        ? await fetch(`/api/courses/${course.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
            }),
          })
        : await fetch(`/api/courses`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userId,
              status: "PENDING",
              type: values.type,
              ...data,
            }),
          });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Création réussie",
          description: "Votre cours a bien été créé.",
        });
        router.push("/my-courses");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la création du cours.",
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof NewCourseFormFieldsType>) => {
    if (!descFromEditor) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography component="p" variant="body-sm">
            Veuillez ajouter une description pour votre cours
          </Typography>
        ),
      });
      return;
    }

    setConfirmPop(true);
  };

  const handlePostCourse = async () => {
    const values = form.getValues();
    values.cover = coverImage ?? "";
    values.description = descFromEditor;
    setConfirmPop(false);
    await postCourse(values);
  };

  return (
    <Container
      className={cn(
        "w-2/3 flex flex-col m-auto",
        isPending && "animate-pulse opacity-50"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5">
            {course && (
              <div className="py-2 px-4 bg-orange-100 rounded-lg text-sm">
                Vous modifier un cours actuelement
              </div>
            )}

            <Container className="relative flex flex-col justify-center items-center w-full mb-4">
              <Container className="w-full h-[30vh] rounded overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src={preview ? preview : DefaultAvatar}
                  alt="Course cover image"
                  className="h-full w-full object-cover"
                />
              </Container>
              <Container className="absolute right-4 bottom-0 transform -translate-y-1/2 flex flex-col lg:flex-row justify-between items-center">
                <label
                  htmlFor="cover"
                  className="cursor-pointer text-xs text-gray-500 hover:text-primary-Default animate bg-slate-50 p-2 rounded flex gap-2 items-center"
                >
                  <ImageDown size={18} /> Image de couverture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="cover"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </Container>
            </Container>

            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Quel est le nom de votre cours ?"
                        {...field}
                        className="text-2xl font-light p-0 border-none bg-transparent h-auto focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card className="w-full bg-white">
                <CardContent className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography
                      variant="title-xs"
                      component="h4"
                      className="text-sm text-secondary-400 mb-2"
                    >
                      Cathegorie
                    </Typography>
                    <InputFieldSelect
                      control={form.control}
                      name="category"
                      options={categoriesMerged}
                      placeholder="Cathegorie"
                    />
                  </div>
                  <div>
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="text-sm text-secondary-400 mb-2"
                    >
                      Type de formation
                    </Typography>
                    <InputFieldSelect
                      control={form.control}
                      name="type"
                      options={TypeCourses}
                      placeholder="Type de votre formation"
                      className={cn(course && "pointer-events-none opacity-50")}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="text-sm text-secondary-400 mb-2"
                    >
                      Prix
                    </Typography>
                    <div className="relative">
                      <InputField
                        control={form.control}
                        name="price"
                        placeholder="Ajouter le prix de votre formation"
                        type="number"
                        className="w-full pr-16 h-12"
                      />
                      <span className="absolute right-2 top-0 text-gray-500 h-12 flex items-center justify-center text-sm">
                        $/mois
                      </span>
                    </div>
                  </div>
                  <div>
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="text-sm text-secondary-400 mb-2"
                    >
                      Durée
                    </Typography>
                    <div className="relative">
                      <InputField
                        control={form.control}
                        name="duration"
                        placeholder="La durée de votre formation"
                        type="number"
                        className="w-full pr-16 h-12"
                      />
                      <span className="absolute right-2 top-0 text-gray-500 h-12 flex items-center justify-center text-sm">
                        mois
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-white">
                <CardContent className="w-full p-4">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full">
                      <Typography
                        variant="title-xs"
                        component="h4"
                        className="text-sm text-secondary-400 mb-2"
                      >
                        Ajouter une video de presentation
                      </Typography>
                      <InputField
                        control={form.control}
                        name="videoUrl"
                        placeholder="Le lien de votre video pour votre cours"
                        className="h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <TooltipProvider>
                <MinimalTiptapEditor
                  value={descFromEditor}
                  onChange={setDescFromEditor}
                  throttleDelay={2000}
                  className="w-full bg-white"
                  editorContentClassName="p-5"
                  output="html"
                  placeholder="Tapez votre description ici..."
                  autofocus={true}
                  immediatelyRender={false}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none"
                />
              </TooltipProvider>
            </div>

            <div className="text-right bg-pr">
              <AlertDialog open={confirmPop}>
                <AlertDialogTrigger asChild>
                  <Buttons type="submit">
                    {course ? "Modifier la formation" : "Créer la formation"}
                  </Buttons>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-primary-50">
                  {course ? (
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Etes vous sur de modifier ce cours ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        La modification du cours ent
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  ) : (
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Etes vous sur de creer ce cours ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        En créant ce cours, vous acceptez toutes nos conditions
                        et règles..
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  )}

                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmPop(false)}>
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-primary-600 hover:bg-primary-400"
                      onClick={() => handlePostCourse()}
                    >
                      {course ? "Modifier la formation" : "Créer la formation"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </form>
      </Form>
    </Container>
  );
};
