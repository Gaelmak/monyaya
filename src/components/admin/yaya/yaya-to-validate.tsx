"use client";

import { Container } from "@/ui/components/container/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import getYayas, { confirmYaya } from "./yaya.action";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import { Phone, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Typography } from "@/ui/components/typography/typography";

export default function YayaToValidate() {
  const { data: yayas, isLoading } = useQuery({
    queryKey: ["yayas"],
    queryFn: async () => {
      return await getYayas("PENDING");
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["yaya"],
    mutationFn: async (name: string) => {
      return await confirmYaya(name, "APPROVED");
    },
  });

  async function handleConfirm(name: string) {
    const res = await mutateAsync(name);
    if (res) {
      toast({
        variant: "success",
        title: "Yaya confirmée",
        description: (
          <Typography component="p" variant="body-sm">
            Yaya confirmée avec succès
          </Typography>
        ),
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue, veuillez réessayer plus tard.
          </Typography>
        ),
      });
    }
  }

  return (
    <Container className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl md:text-3xl font-bold">Formateurs à valider</h2>
      {yayas ? (
        <div className="p-6 rounded-lg bg-gray-50">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {yayas?.map((yaya, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col p-6 text-sm gap-4">
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                          <Avatar className="w-24 h-24 border border-gray-100">
                            <AvatarImage
                              src={yaya?.image ?? ""}
                              alt="@shadcn"
                            />
                            <AvatarFallback className="border-gray-900">
                              Y
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-bold text-primary-700">{`${yaya?.firstName} ${yaya?.lastName}`}</h3>
                            <p>
                              <span className="opacity-50 mr-1">Email:</span>
                              {yaya?.email}
                            </p>
                            <p>
                              <span className="opacity-50 mr-1">Date:</span>
                              {dayjs(yaya?.yaya?.createdAt).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                            <p>
                              <span className="opacity-50 mr-1">Adresse:</span>
                              {`${yaya?.number} ${yaya?.avenue}, ${yaya?.district}, ${yaya?.municipality}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span>
                            <Text
                              size={16}
                              className="mt-[2px] text-green-700"
                            />
                          </span>
                          <p className="line-clamp-4">{yaya?.bio}</p>
                        </div>
                        <div className="flex gap-2 items-center justify-between">
                          <div className="flex gap-2">
                            <span>
                              <Phone
                                size={16}
                                className="mt-[2px] text-green-700"
                              />
                            </span>
                            <p>{yaya?.phoneNumber}</p>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-green-700">Valider</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Êtes-vous sûr de vouloir confirmer ce yaya sur
                                  le site ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action est irréversible et marquera le
                                  yaya comme validé. Assurez-vous que toutes les
                                  informations sont correctes avant de
                                  continuer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-primary-700"
                                  onClick={() => handleConfirm(yaya?.name)}
                                >
                                  Continuer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <Skeleton className="bg-gray-100 h-48 w-full" />
      )}
    </Container>
  );
}
