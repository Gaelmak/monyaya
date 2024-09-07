import prisma from "@/lib/prisma";
import { Typography } from "@/ui/components/typography/typography";
import {
  Calendar,
  List,
  PenBox,
  Map,
  Share2,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RekreationPaysage from "../../../../../public/rekreatioonPaysage.jpg";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { string } from "zod";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function HandleCourse({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURIComponent(params.id);
  const courses = await prisma.courses.findUnique({
    where: {
      id: id,
    },
    include: {},
  });

  //tableau provisoir pour faire passé les lecons
  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `Developpement web Chapitre.${a.length - i}`
  );

  return (
    <main className="flex max-w-full select-none w-full  lg:px-[7vw] mb-20">
      <div className="flex  flex-row-reverse justify-between items-start relative gap-6 pt-4 w-full">
        <Card className="lg:w-1/3 md:w-1/3  sticky right-0 top-0  rounded-xl h-[calc(115vh-65px)]">
          <CardHeader className="">
            <CardTitle className="flex flex-row justify-between items-center border-b-2 pb-2">
              <Typography className="text-base">
                {`$ ${"100"}`}
                <span className="text-secondary-600">/Mois</span>
              </Typography>
              <Badge className="bg-primary-Default text-primary-50 font-normal ">
                {"Online"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex flex-col gap-1 w-1/2">
                <Typography className="text-sm font-medium text-primary-400">
                  Durée
                </Typography>
                <div className="bg-primary-Default  py-2 w-full rounded-lg text-center text-sm font-medium text-white ">
                  <Typography>{"6 mois"}</Typography>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <Typography className="text-sm font-medium text-primary-400">
                  Durée courte
                </Typography>
                <div className="bg-primary-Default  py-2 text-sm font-medium rounded-lg text-center  text-white ">
                  <Typography>{"3 mois"}</Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <Typography className="text-sm font-medium text-primary-400">
                {"Perequis"}
              </Typography>
              <DropdownMenu>
                <DropdownMenuTrigger className=" flex flex-row justify-between items-center text-sm font-medium bg-primary-Default text-white px-4 py-3 rounded-lg data-[state=closed]:border-none data-[state=closed]:border-transparent ">
                  Savoir avant de debuter
                  <ChevronDown size={20} strokeWidth={1} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary-55 w-[20vw]">
                  <DropdownMenuLabel>
                    Pour debuter ce cours vous devez connaitre
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Connaitre les bases du HTML CSS
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Notions sur le reseau internet
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Etre a en mesure de faire une recherche sur internet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Typography className="text-sm font-medium text-primary-400 pb-2">
                {"Appercu de lecon pour ce cours"}
              </Typography>
              <ScrollArea className="md:h-[10vw] lg:h-[20vw] border-none rounded-md ">
                <div className="pt-2">
                  <div>
                    <div className=" w-full ">
                      {tags.map((tag, index) => (
                        <div key={index}>
                          <Typography className="text-secondary-800 font-medium">
                            {tag}
                          </Typography>
                          <div className="border-b-secondary-900"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter>
            <Buttons className="w-full">Demarer</Buttons>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-5 w-[60%]">
          <div className="">
            <iframe
              width="100%"
              height="auto"
              src="https://youtu.be/jOHVRabET4w?list=RDjOHVRabET4w"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[60vh] rounded-xl"
            ></iframe>
          </div>
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-row justify-start items-center gap-3 text-xs">
              <div className="flex flex-row items-center p-2 bg-primary-100 rounded py-1 text-center ">
                <Typography className="semibold font-semibold text-center m-auto text-primary-600">
                  {"Statut"}
                </Typography>
              </div>
              <div className="flex flex-row items-center p-2 bg-teal-100 rounded py-1 text-center ">
                <Typography className="semibold font-semibold text-center m-auto text-teal-600">
                  {"Categories"}
                </Typography>
              </div>
              <div className="flex flex-row items-center p-2 bg-red-100 rounded py-1 text-center ">
                <Typography className="semibold font-semibold text-center m-auto text-red-600">
                  {"Type"}
                </Typography>
              </div>
              <div className="flex flex-row items-center p-2 bg-amber-100 rounded py-1 text-center ">
                <Typography className="semibold font-semibold text-center m-auto text-amber-600">
                  {"note"}
                </Typography>
              </div>
            </div>
            <div className=" flex flex-row justify-between items-center gap-2 text-secondary-600">
              <Share2 size={20} strokeWidth={1} />
              <Bookmark size={20} strokeWidth={1} />
            </div>
          </div>
          <div>
            <Typography className="text-lg font-bold text-primary-900">
              {"Development web & mobile Javascript "}
            </Typography>
            <div className="flex items-center justify-start gap-3 text-secondary-400 text-xs font-medium">
              <Avatar>
                <AvatarImage
                  src="https://lh3.googleusercontent.com/a/ACg8ocKi7_sRkEisPwvp2TKaQQXOPC0DjsoGJ24BReynndwrm_7InhzT=s432-c-no"
                  alt="@radix-vue"
                  className="rounded-full w-6 h-6"
                />
                <AvatarFallback>theodore</AvatarFallback>
              </Avatar>
              <Typography>{"Theodore Binda"}</Typography>
              <Typography>{"Municipality"}</Typography>
              <Typography>{"district"}</Typography>{" "}
              <Typography>{"avenue"}</Typography>
              <Typography>{"numero"}</Typography>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Tabs className="" defaultValue="Description">
              <TabsList
                defaultValue={"Description"}
                className="text-sm font-medium gap-5 text-secondary-900"
              >
                <TabsTrigger
                  value="Description"
                  className="border-none  data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="Yaya"
                  className="border-none data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                >
                  yaya
                </TabsTrigger>
                <TabsTrigger
                  value="lecons"
                  className="border-none data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                >
                  lecons
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="Description"
                className="text-secondary-600 text-base "
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                quas provident soluta consequatur voluptatem ipsam a asperiores
                magni, nisi incidunt neque porro perspiciatis ipsum dolore nam
                distinctio vero tenetur et sequi. Velit nisi, adipisci quas
                necessitatibus eum numquam molestias autem illo libero
                explicabo, accusamus ea architecto dolor aut fugit at? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Illo labore
                maxime unde deserunt similique voluptatum nam, eos consectetur
                alias, quo mollitia nemo reiciendis? Fugiat quidem magnam totam
                consectetur nam ipsum, animi dolorum molestiae modi aut ab
                tempore ipsam architecto incidunt quia quibusdam qui dignissimos
                vero enim necessitatibus deserunt facilis placeat quas dolor. In
                velit aut eos ratione explicabo recusandae, quas doloribus
                consequatur quisquam ducimus tempore unde eligendi similique
                voluptas blanditiis voluptatibus! Laborum distinctio officiis
                possimus ab hic nam quo sit beatae eos, natus corporis sequi
                repellendus praesentium! Aperiam quae delectus sapiente hic
                vitae aliquid quaerat a error iure, ipsum aspernatur?
              </TabsContent>
              <TabsContent
                value="Yaya"
                className="text-secondary-600 text-base"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus quia animi cupiditate voluptates molestiae earum porro
                et ut, quasi nam eaque amet ipsam odio illo quam rerum quaerat
                optio odit doloremque? Sed odit quisquam saepe quibusdam eos
                consequuntur, a dolore obcaecati aspernatur nesciunt quas
                suscipit similique ducimus quae maiores incidunt?.
              </TabsContent>
              <TabsContent
                value="lecons"
                className="text-secondary-600 text-base"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, autem temporibus est adipisci corrupti neque doloremque
                aliquam voluptates aperiam ullam. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Deleniti qui consectetur facere
                possimus similique obcaecati dicta nobis modi, voluptatem fuga.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
