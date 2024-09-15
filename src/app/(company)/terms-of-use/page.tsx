"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/ui/components/container/container";
import { termOfUse } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
  const [activeSection, setActiveSection] = useState<string>(termOfUse[0].id);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const offset = 150;

    termOfUse.forEach((article) => {
      const element = document.getElementById(article.id);
      if (element) {
        const elementPosition = element.offsetTop;
        const elementHeight = element.clientHeight;
        if (
          scrollPosition >= elementPosition - offset &&
          scrollPosition < elementPosition + elementHeight - offset
        ) {
          setActiveSection(article.id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex max-w-full select-none w-full lg:px-[7vw]">
      <Container className="flex justify-between items-start relative">
        <Container
          className={`hidden lg:w-1/4 md:w-1/3 md:flex sticky left-0 top-0 pt-8 bg-gray-100 p-4 h-[calc(115vh-65px)]`}
        >
          <ul className="w-full pt-10">
            {termOfUse.map((article, index) => (
              <Container
                key={index}
                className="flex justify-start gap-6 items-center"
              >
                <li>
                  <Link
                    href={`#${article.id}`}
                    className="text-lg text-slate-400"
                  >
                    {article.id}
                  </Link>
                </li>
                <li>
                  <span
                    onClick={() => handleClick(article.id)}
                    className={`block px-2 py-2 cursor-pointer ${
                      activeSection === article.id
                        ? "font-semibold text-[#39ae44]"
                        : "text-gray-700"
                    }`}
                  >
                    {article.title}
                  </span>
                </li>
              </Container>
            ))}
          </ul>
        </Container>
        <Container className="flex flex-col ml-4 md:w-2/3 lg:w-3/4 md:mr-4">
          <Container className="leading-relaxed mb-6 flex flex-col gap-4">
            <Typography
              className="leading-relaxed text-[#39ae44] text-5xl font-semibold"
              component="h3"
            >
              Contrats
            </Typography>
            <Typography
              className="text-[#424242] text-xl"
              component="h5"
              variant="title-sm"
            >
              Pour Clients,
            </Typography>
            <Typography
              component="p"
              className="flex flex-col leading-relaxed"
              variant="body-base"
            >
              Contrat de service d'apprentissage à domicile Entre
              <br />
              <Typography component="span" variant="body-lg">
                MonYaya
              </Typography>
              <br />
              société par actions simplifiée dont le siège social est situé a
              [adresse],représentée par [nom du représentant légal],en qualité
              de [fonction],
              <span className="font-semibold">{"D'une part,"}</span>
              <br />
              Et [Nom du client], [qualité du client], demeurant [adresse],
              <br />
              <span className="font-semibold">{"D'autre part,"}</span>
              <br />
              il a été conclu le présent contrat de service d'apprentissage à
              domicile, ci- après dénommé{" "}
              <span className="font-semibold">{`"Contrat"`}</span>
            </Typography>
          </Container>
          {termOfUse.map((section, index) => (
            <div id={section.id} key={index} className="mb-10">
              <Typography className="mb-4 text-[#39ae44] text-2xl font-semibold">
                {section.title}
              </Typography>
              <Typography className="leading-relaxed" variant="body-base">
                {section.content}
              </Typography>
            </div>
          ))}
        </Container>
      </Container>
    </main>
  );
}
