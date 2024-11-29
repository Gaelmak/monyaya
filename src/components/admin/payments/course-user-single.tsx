"use client";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getUserCoursePayments } from "./action.payments";
import { Courses, User, UserCourse, Yaya } from "@prisma/client";
import CoursesUserChangeDialog from "./change-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoveRightIcon } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { LogosWhatsappIcon } from "@/components/icons/whatsapp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CoursesUserListProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserCourse:
    | (UserCourse & {
        course: Courses & {
          yaya: Yaya & {
            user: User;
          };
        };
        user: User;
      })
    | null;
  isAdmin?: boolean;
};

export default function CoursesUserSingle({
  open,
  setOpen,
  currentUserCourse,
  isAdmin,
}: CoursesUserListProps) {
  const searchParams = useSearchParams();
  const refetch = searchParams.get("refetch");

  const { data: coursePayments, isPending } = useQuery({
    queryKey: ["serCoursePayments", currentUserCourse?.id, refetch],
    queryFn: async () => {
      const res = await getUserCoursePayments(
        currentUserCourse?.id,
        currentUserCourse?.course?.duration,
        currentUserCourse?.course?.price,
        currentUserCourse?.course?.createAt
      );
      if (!res) {
        throw new Error("Network response was not ok");
      }
      return res;
    },
    enabled: !!currentUserCourse?.id,
  });

  console.log(coursePayments);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      {/* <CredenzaTrigger asChild>
        <Button>Open modal</Button>
      </CredenzaTrigger> */}
      <CredenzaContent className="bg-white max-w-2xl">
        <CredenzaHeader>
          <CredenzaTitle>{currentUserCourse?.course?.title}</CredenzaTitle>
          <div className="flex gap-2 items-center justify-center md:justify-start w-full text-sm">
            <div className="flex gap-1 items-center">
              <Avatar className="w-7 h-7 rounded-full border border-primary-500">
                <AvatarImage
                  src={`${
                    currentUserCourse?.user?.image
                      ? currentUserCourse?.user?.image
                      : "/default_avatar.jpg"
                  }`}
                />
                <AvatarFallback className="bg-primary-700">CN</AvatarFallback>
              </Avatar>
              {`${currentUserCourse?.user?.firstName} ${currentUserCourse?.user?.lastName}`}
              {currentUserCourse?.user?.phoneNumber && (
                <Link
                  href={`https://wa.me/${parsePhoneNumber(
                    currentUserCourse?.user?.phoneNumber
                  )}?text=${waDefaultText(currentUserCourse?.course?.title)}`}
                  target="_blank"
                >
                  <LogosWhatsappIcon className="w-5 h-5" />
                </Link>
              )}
            </div>
            {isAdmin && (
              <>
                <MoveRightIcon className="text-muted-500" strokeWidth={0.5} />
                <div className="flex gap-1 items-center">
                  <Avatar className="w-7 h-7 rounded-full border border-primary-500">
                    <AvatarImage
                      src={`${
                        currentUserCourse?.course?.yaya?.user?.image
                          ? currentUserCourse?.course?.yaya?.user?.image
                          : "/default_avatar.jpg"
                      }`}
                    />
                    <AvatarFallback className="bg-primary-700">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  {`${currentUserCourse?.course?.yaya?.user?.firstName} ${currentUserCourse?.course?.yaya?.user?.lastName}`}
                  {currentUserCourse?.course?.yaya?.user?.phoneNumber && (
                    <Link
                      href={`https://wa.me/${parsePhoneNumber(
                        currentUserCourse?.course?.yaya?.user?.phoneNumber
                      )}?text=${waDefaultText(
                        currentUserCourse?.course?.title
                      )}`}
                      target="_blank"
                    >
                      <LogosWhatsappIcon className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </CredenzaHeader>
        <CredenzaBody>
          {isPending ? (
            <div className="h-40 w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : coursePayments?.length === 0 ? (
            <div className="h-40 w-full flex justify-center items-center">
              <p>Aucun paiement pour ce cours</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="w-full">
                  <TableHead className="w-1/12">Mois</TableHead>
                  <TableHead className="w-3/12">Prix</TableHead>
                  <TableHead className="w-4/12">Date limite</TableHead>
                  <TableHead className="w-3/12">Status</TableHead>
                  <TableHead className="text-right w-1/12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coursePayments?.map((coursePayment) => {
                  return (
                    <TableRow className="align-middle" key={coursePayment.id}>
                      <TableCell className="font-medium">
                        <div>{coursePayment?.month}</div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        <div>{coursePayment?.price}$</div>
                      </TableCell>
                      <TableCell>
                        {dayjs(coursePayment?.limitDate)
                          .locale("fr")
                          .format("dd DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {coursePayment?.isPaid ? (
                          <span className="text-green-500">Payé</span>
                        ) : !coursePayment?.isPaid &&
                          dayjs().isAfter(coursePayment?.limitDate) ? (
                          <span className="text-red-500">Expiré</span>
                        ) : (
                          <span className="text-orange-400">En attente</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {coursePayment?.isPaid ? (
                          <p className="text-xs">
                            Payé le{" "}
                            {dayjs(coursePayment?.payAt).format("DD/MM/YYYY")}
                          </p>
                        ) : isAdmin ? (
                          <CoursesUserChangeDialog
                            open={open}
                            setOpen={setOpen}
                            payment={coursePayment}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

function parsePhoneNumber(phoneNumber: string | undefined) {
  if (!phoneNumber) {
    return "";
  }
  const phoneClean = phoneNumber.trim().slice(1);
  return `243${phoneClean}`;
}

function waDefaultText(courseTitle: string | undefined) {
  if (!courseTitle) {
    return "";
  }

  const text = `Cours: ${courseTitle}`;
  return text;
}
