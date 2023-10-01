'use client'

import { Buttons } from "@/ui/components/buttons/buttons";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export default function Home() {
  return (
    <main className="px-16">
      <h1>Design system</h1>
      <br/>
      <Typography variant="body-base" component="p">Typographie</Typography>
      <br/>
      <Typography variant="title-lg" component="h1" color="primary">Titre 1<br/>On two line</Typography>
      <Typography variant="title-base" component="h2" color="secondary">Titre 2<br/>On two line</Typography>
      <Typography variant="title-sm" component="h3" color="destructive">Titre 3<br/>On two line</Typography>
      <Typography variant="title-xs" component="h4" color="black">Titre 4<br/>On two line</Typography>
      <Typography variant="body-lg" component="p" color="accent">Body text lg <br/>On two line</Typography>
      <Typography variant="body-base" component="p" color="black">Body text base <br/>On two line</Typography>
      <Typography variant="body-sm" component="p" color="accent">Body text sm <br/>On two line</Typography>
    
      <br/>
      <Typography variant="body-base" component="p">Boutons</Typography>
      <br/>
      <Container className="flex flex-row gap-8">
        <Buttons>button</Buttons>
        <Buttons disabled={true}>disableb</Buttons>
        <Buttons variant="primary" outline="outline">outline</Buttons>
        <Buttons disabled={true} variant="primary" outline="outline">Outline disableb</Buttons>
      </Container>
      <br/>
      <Container className="flex flex-row gap-8">
        <Buttons variant="secondary">button</Buttons>
        <Buttons variant="secondary" disabled={true}>disableb</Buttons>
        <Buttons variant="secondary" outline="outline">outline</Buttons>
        <Buttons variant="secondary" disabled={true} outline="outline">Outline disableb</Buttons>
      </Container>
      <br/>
      <Container className="flex flex-row p-6 gap-8 bg-black">
        <Buttons variant="ghost">White</Buttons>
        <Buttons variant="accent">Accent</Buttons>
      </Container>
      <br/>
      <Container className="flex flex-row gap-8">
        <Buttons buttonType="action" action={() => {console.log('bonjour')}} variant="primary">button</Buttons>
        <Buttons buttonType="link" baseUrl="/" variant="primary" outline="outline">outline</Buttons>
      </Container>
      <br/>
    </main>
  )
}
