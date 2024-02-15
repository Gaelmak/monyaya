import { Container } from "@/ui/components/container/container";
import { Aside } from "./aside";
import { RegisterForm } from "./register-form";
import { BackButton } from "@/ui/components/back-button/back-button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function NewUser() {
  return (
    <Container className="h-[100dvh] flex flex-row relative">
      <Container className="absolute top-8 left-8">
        <BackButton backTo="/registration"/>
      </Container>
      <Container className="basis-3/5 flex flex-col justify-center items-center md:px-16">
        <ScrollArea>
          <Container className="md:w-[30vw] flex flex-col gap-6 justify-center items-center">
            <Container className="w-full px-2">
              <RegisterForm/>
            </Container>
          </Container>
        </ScrollArea>
      </Container>
      <Container className="basis-2/5">
        <Aside/>
      </Container>
    </Container>
  )
}