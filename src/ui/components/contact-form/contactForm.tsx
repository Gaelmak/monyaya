"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Buttons } from "../buttons/buttons";
import { InputField } from "../input-field/input-field";

// Types pour le formulaire
type ContactFormData = {
  username: string;
  email: string;
  message: string;
  phone?: string; // facultatif
};

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Veuillez entrer un nom valide.")
    .max(20, "Trop de lettre pou un nom"),
  email: z.string().email("Veuillez entrer un email valide."),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères."),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Numéro de téléphone invalide")
    .optional(), // Validation d'abord, puis facultatif
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
      phone: "", //
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-none shadow-none flex flex-col  gap-2">
          <CardContent className="text-sm text-secondary-900">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="w-1/2">
                <div>
                  <span>Nom</span>
                  <InputField
                    control={form.control}
                    name="username"
                    placeholder="Votre nom"
                    className="w-full "
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div>
                  <span>téléphone</span>
                  <InputField
                    control={form.control}
                    name="phone"
                    placeholder="Votre numero de telephone"
                    className="w-full "
                  />
                </div>
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <span>Email</span>
              <InputField
                control={form.control}
                name="email"
                placeholder="Votre adresse mail"
                className="w-full "
              />
            </div>
            {/* Champ Message */}
            <div>
              <span>Message</span>
              <InputField
                control={form.control}
                type="textarea"
                name="message"
                placeholder="Votre Message ici "
                className="h-28"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Buttons type="submit">Envoyer</Buttons>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
