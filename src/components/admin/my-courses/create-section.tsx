"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { Typography } from "@/ui/components/typography/typography";
import { Sections } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit avoir au moins 2 caractères.",
  }),
  description: z.string(),
});

export type CreateSectionProps = {
  sections: Sections[];
  courseId: string;
  isPopOpen: boolean;
  setIsPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchSections: () => void;
};

export default function CreateSection(props: CreateSectionProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["createSection"],
    mutationFn: async (
      values: z.infer<typeof formSchema> & { order: number }
    ) => {
      return await fetch(`/api/courses/${props.courseId}/sections`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          order: values.order,
        }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Section créée",
        description: (
          <Typography component="p" variant="body-sm">
            La section a bien été créée avec succès
          </Typography>
        ),
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue durant la création de la section. Veuillez
            réessayer plus tard.
          </Typography>
        ),
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const order = props.sections.length + 1;
    const newSection = {
      title: values.title,
      description: values.description,
      order: order,
    };
    await mutateAsync(newSection);
    props.setIsPopOpen(false);
    props.refetchSections();
  }

  return (
    <div className="space-y-4">
      <AlertDialogHeader>
        <AlertDialogTitle>Créer une nouvelle section</AlertDialogTitle>
        <AlertDialogDescription>
          Cela vous aide à organiser votre cours de manière structurée et à
          fournir des informations claires aux apprenants.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Que ce qui decrit cette section ?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              // type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Créer
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </div>
  );
}
