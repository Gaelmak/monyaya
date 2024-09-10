import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import DefaultAvatar from "../../public/default_avatar.jpg";
import Image from "next/image";

interface Props {
  className?: string;
}

export const AsideCourseNav = async ({ className }: Props) => {
  //   const session = await userAuth();
  //   const user = await prisma?.user.findUnique({
  //     where: {
  //       name: session!.name!,
  //     },
  //   });

  return (
    <div
      className={clsx(
        "h-full w-full flex flex-col justify-between bg-white",
        className
      )}
    >
      <div className="w-full md:p-4">
        <div className="items-center w-full flex justify-center flex-row gap-2 pb-4">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-start rounded-full max-w-14 max-h-14 overflow-hidden aspect-square">
              <Image
                width={40}
                height={40}
                className="w-full h-full object-cover"
                src={DefaultAvatar}
                alt="User profile image"
              />
            </div>
            <div className="flex flex-col w-full">
              <Typography className="text-[15px] font-bold">
                Theodore SAMBA
              </Typography>
              <div className="flex flex-row gap-2 justify-between w-full items-center">
                <Typography variant="body-sm">@{"Nom User"}</Typography>
                <Typography className="py-1 px-2 rounded-full bg-primary-600 text-white text-[10px]">
                  yaya
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Typography
              variant="body-base"
              component="p"
              className="w-full text-black/60 space-y-2"
            >
              Hello
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
