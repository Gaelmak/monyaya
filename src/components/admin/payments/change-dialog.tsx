"use client";

import dayjs from "dayjs";
import "dayjs/locale/fr";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateUserCoursePayment } from "./action.payments";
import { Courses, Payment, UserCourse } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";

type CoursesUserListProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  payment: Payment;
};

const FormSchema = z.object({
  payBy: z.enum(["MOBILE_MONEY", "CASH", "CREDIT_CARD", "BANK_TRANSFER"], {
    required_error: "La méthode de paiement est requise.",
  }),
  reference: z.string().min(1, "La référence est requise."),
});

export default function CoursesUserChangeDialog({
  open,
  setOpen,
  payment,
}: CoursesUserListProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const refetch = searchParams.get("refetch");
  const posthog = usePostHog();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return updateUserCoursePayment(payment?.id, data.payBy, data.reference);
    },
    onSuccess: (data) => {
      setIsOpenDialog(false);
      setOpen(false);
      router.push(`/payments?refetch=${Number(refetch ?? 0) + 1}`);
      toast({
        title: "Paiement mis à jour avec succès",
      });
      posthog.capture("course_user_payment_added", {
        course_id: payment?.userCourseId,
        payBy: data?.payBy,
        price: data?.price,
        paymentDate: data?.payAt,
      });
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    await mutateAsync(data);
    setIsLoading(false);
  }

  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogTrigger asChild>
        <Button className="py-2 px-4 h-max text-xs bg-primary-600">
          Traiter
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>Enregistrer le paiement</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-2", isLoading && "opacity-50")}
          >
            <FormField
              control={form.control}
              name="payBy"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Methode de paiement" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="MOBILE_MONEY">Mobile Money</SelectItem>
                      <SelectItem value="CASH">Espèces</SelectItem>
                      <SelectItem value="CREDIT_CARD">
                        Carte de Crédit
                      </SelectItem>
                      <SelectItem value="BANK_TRANSFER">
                        Virement Bancaire
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Référence du paiement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            className="w-full bg-primary-600"
          >
            Enregistrer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
