import { OurBenefits } from "@/lib/our-benefits/our-benefits";
import { SignInButton } from "@/routes/auth-buttons";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { userAuth } from "@/lib/helper";

export const Benefits = async () => {
  const user = await userAuth();
  return (
    <Container className="px-6 md:px-8 py-24 flex flex-col gap-20 bg-primary-50">
      <Container className="flex flex-col items-center">
        <Typography variant="title-lg" className="md:w-[60%] text-center">
          Découvrez les nombreux avantages de notre plateforme de formation !
        </Typography>
        <Typography className="md:w-[60%] text-center">
          Nous mettons tout en œuvre pour vous offrir une expérience
          d'apprentissage unique et enrichissante.
        </Typography>
      </Container>
      <Container className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {OurBenefits.map(({ Icon, title, description }) => (
          <Container key={title} className="flex flex-col md:flex-row gap-4">
            <Container className="basis-1/6">
              <Icon className="text-primary-Default" size={40} />
            </Container>
            <Container className="basis-5/6">
              <Typography variant="title-sm">{title}</Typography>
              <Typography>{description}</Typography>
            </Container>
          </Container>
        ))}
      </Container>
      {!user && (
        <Container className="w-full flex justify-center">
          <SignInButton />
        </Container>
      )}
    </Container>
  );
};
