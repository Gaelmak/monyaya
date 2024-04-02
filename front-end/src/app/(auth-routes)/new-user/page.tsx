import { Container } from "@/ui/components/container/container";
import { Aside } from "./aside";
import { RegisterForm } from "./register-form";
import { BackButton } from "@/ui/components/back-button/back-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home } from "lucide-react";

export default async function NewUser() {
  return (
    <Container className="md:h-[100dvh] flex flex-col md:flex-row relative">
      <Container className="absolute top-8 left-8">
        <BackButton backTo="/registration"/>
      </Container>
      <Container className="absolute top-8 right-8 z-10">
        <BackButton icon="home" backTo="/" className="md:hidden"/>
        <BackButton icon="home" backTo="/" className="hidden md:flex">Retourner à l'écran d'acceuil</BackButton>
      </Container>
      <Container className="py-24 md:py-0 md:basis-3/5 flex flex-col justify-center items-center px-8 md:px-16">
        <ScrollArea>
          <Container className="md:w-[30vw] flex flex-col gap-6 justify-center items-center">
            <Container className="w-full px-2">
              <RegisterForm/>
            </Container>
          </Container>
        </ScrollArea>
      </Container>
      <Container className="h-[60vh] md:h-full md:basis-2/5">
        <Aside/>
      </Container>
    </Container>
  )
}