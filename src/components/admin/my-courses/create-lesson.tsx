"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Container } from "@/ui/components/container/container";
import { Form, FormMessage } from "@/components/ui/form";
import { NewLessonsFormFieldsType } from "@/types/forms";
import { InputField } from "@/ui/components/input-field/input-field";
import { Typography } from "@/ui/components/typography/typography";
import { Buttons } from "@/ui/components/buttons/buttons";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Courses, Lessons, Yaya } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  course: Courses;
  yaya: Yaya;
  lesson?: Lessons | null;
}

export const AddCourLesson = ({ yaya, course, lesson }: Props) => {
  const [contentFromEditor, setContentFromEditor] = useState<any>(null);
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sid");
  const router = useRouter();

  useEffect(() => {
    if (lesson) {
      setContentFromEditor(lesson?.content);
    }
  }, [lesson]);

  const form = useForm<z.infer<typeof NewLessonsFormFieldsType>>({
    resolver: zodResolver(NewLessonsFormFieldsType),
    defaultValues: {
      title: lesson?.title ?? "",
      description: lesson?.description ?? "",
      content: contentFromEditor ?? "",
      videoUrl: lesson?.videoUrl ?? "",
      meetUrl: lesson?.meetUrl ?? "",
      adress: lesson?.adress ?? "",
    },
  });

  const { mutateAsync: postLesson, isPending } = useMutation({
    mutationKey: ["postCourse"],
    mutationFn: async (values: z.infer<typeof NewLessonsFormFieldsType>) => {
      const data = {
        title: values.title,
        description: values.description,
        content: values.content,
        videoUrl: values.videoUrl,
        meetUrl: values.meetUrl,
        adress: values.adress,
      };
      const res = lesson
        ? await fetch(`/api/lessons/${lesson.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
            }),
          })
        : await fetch(`/api/courses/${course.id}/lessons?sid=${sectionId}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
            }),
          });
      if (res.ok) {
        toast({
          variant: "success",
          title: "Création réussie",
          description: "Votre leçon a bien été créée.",
        });
        router.push(`/my-courses/${course.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la création de la leçon.",
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof NewLessonsFormFieldsType>) => {
    values.content = contentFromEditor;
    if (!values.content) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez ajouter du contenu à votre leçon.",
      });
      return;
    }
    await postLesson(values);
  };

  return (
    <Container
      className={cn(
        "w-full 2xl:w-2/3 flex flex-col m-auto pt-6 md:pt-1",
        isPending && "animate-pulse opacity-50"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-5">
            {lesson && (
              <div className="py-2 px-4 bg-orange-100 rounded-lg text-sm">
                Vous modifier cette leçon actuelement
              </div>
            )}

            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Donner un titre à votre leçon"
                        {...field}
                        className="text-2xl font-light p-0 border-none bg-transparent h-auto focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card className="w-full bg-white">
                <CardContent className="w-full p-4">
                  <div>
                    <Typography
                      variant="title-xs"
                      component="h4"
                      className="text-sm text-secondary-400 mb-2"
                    >
                      Description
                    </Typography>
                    <InputField
                      control={form.control}
                      name="description"
                      placeholder="Ajouter une description à cette leçon"
                      type="textarea"
                      className="w-full pr-16 h-12"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Typography
                        variant="title-xs"
                        component="h4"
                        className="text-sm text-secondary-400 mb-2"
                      >
                        Vidéo de présentation
                      </Typography>
                      <InputField
                        control={form.control}
                        name="videoUrl"
                        placeholder="ex: https://www.youtube.com/watch?v=ejFsz3T6DUk"
                        type="text"
                        className="w-full pr-16 h-12"
                        description="Peut-être une vidéo de présentation ou la vidéo complète de la leçon"
                      />
                    </div>
                    {course.type === "ONLINE" && (
                      <div>
                        <Typography
                          variant="title-xs"
                          component="h4"
                          className="text-sm text-secondary-400 mb-2"
                        >
                          Lien google meet ou zoom pour une séance de coaching.
                        </Typography>
                        <InputField
                          control={form.control}
                          name="meetUrl"
                          placeholder="ex: https://meet.google.com/link"
                          type="text"
                          className="w-full pr-16 h-12"
                          description="Utile si la leçon est une séance de coaching en ligne"
                        />
                      </div>
                    )}
                    {course.type === "ONSITE" && (
                      <div>
                        <Typography
                          variant="title-xs"
                          component="h4"
                          className="text-sm text-secondary-400 mb-2"
                        >
                          Adresse
                        </Typography>
                        <InputField
                          control={form.control}
                          name="adress"
                          placeholder="Adresse pour cette leçon"
                          type="text"
                          className="w-full pr-16 h-12"
                          description="Entrer l'adresse où l'apprenant peut se rendre pour suivre la leçon"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <TooltipProvider>
                <MinimalTiptapEditor
                  value={contentFromEditor}
                  onChange={setContentFromEditor}
                  throttleDelay={2000}
                  className="w-full bg-white"
                  editorContentClassName="p-5"
                  output="html"
                  placeholder="Commencer à écrire l’aperçu de la leçon..."
                  autofocus={true}
                  immediatelyRender={false}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none"
                />
              </TooltipProvider>
            </div>

            <div className="text-right bg-pr">
              <Buttons type="submit">
                {lesson ? "Modifier la leçon" : "Créer la leçon"}
              </Buttons>
            </div>
          </div>
        </form>
      </Form>
    </Container>
  );
};
