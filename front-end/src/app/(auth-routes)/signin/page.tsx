import { getProviders } from "next-auth/react"
import { ProvidersList } from "./providers-list"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Aside } from "./aside"
import { SigninForm } from "./signin-form"

export default async function SignIn() {

  const providerslist = await getProviders()

  return (
    <Container className="h-[100dvh] flex flex-row">
      <Container className="basis-2/5">
        <Aside/>
      </Container>
      <Container className="basis-3/5 flex flex-col justify-center items-center md:px-16">
        <Container className="md:w-[30vw] flex flex-col gap-6 justify-center items-center">
          <Container className="flex flex-col items-center gap-2">
            <Typography variant="title-lg" component="h2">Heureux de vous revoir !</Typography>
            <Typography variant="body-sm" component="p" className="text-secondary-300">Veuillez selectionner un mode de connexion</Typography>
          </Container>
          <Container>
            <ProvidersList providers={Object.values(providerslist!)}/>
          </Container>
          <Container className="w-full flex items-center after:basis-1/2 after:content-[''] after:p-[0.5px] after:m-2 after:bg-secondary-100 before:basis-1/2 before:content-[''] before:p-[0.5px] before:m-2 before:bg-secondary-100">
            <Typography variant="body-sm" component="p" className="text-secondary-300">Ou</Typography>
          </Container>
          <Container className="w-full px-2">
            <SigninForm/>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
