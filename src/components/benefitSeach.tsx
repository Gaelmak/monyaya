import { OurBenefits } from "@/lib/our-benefits/our-benefits";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { SearchCourses } from "@/ui/modules/search/search-courses";
import Image from "next/image";
import imageBenefit from "public/mail.jpg"

export const BenefitSearch = () => {
  return (
    <Container className="px-6 md:px-8 py-16 flex flex-col gap-20 bg-primary-50">
      <Container className="flex flex-col justify-center m-auto items-center md:w-[60%] gap-4">
        <Typography variant="title-base" className="md:w-[60%] text-center">
          Recherche une Formation !
        </Typography>
        <SearchCourses />
      </Container>
      <Container className="flex flex-col md:flex-row md:justify-between items-center md:pt-6  md:pb-16">
        <Container className="md:w-2/5 flex justify-start items-start m-auto ">
            <Image src={imageBenefit} alt="Image benefit" className=" object-cover border-dashed border-2 border-primary-Default p-2 rounded-3xl" />
        </Container>
       <Container className="md:w-1/2 flex flex-col gap-5 py-4">
        <Typography variant="title-base" className="text-center md:text-left"><span className=" text-primary-Default">Avantages </span> d'Apprendre Dans <br/>Notre Plateforme</Typography>
        {OurBenefits.map(({ Icon, title, description }) => (
          <Container key={title} className="flex items-center">
            <Container className="pr-6">
              <Icon className="text-white bg-primary-Default rounded-full p-1" size={40} />
            </Container>
            <Container className="py-2 flex flex-col gap-2">
              <Typography variant="title-sm" >{title}</Typography>
              <Typography >{description}</Typography>
            </Container>
          </Container>
        ))}
      </Container>
      </Container>
    </Container>
  );
};
