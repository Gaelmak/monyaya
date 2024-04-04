/* eslint-disable react/no-unescaped-entities */
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

export const TermsAndConditions = () => {
  return(
    <SheetContent side={"bottom"} className="bg-white w-full flex flex-col gap-8 lg:px-80">
      <SheetHeader>
        <SheetTitle>
          <Typography component="h3" variant="title-base">Termes et conditions d'utilisation</Typography>
        </SheetTitle>
      </SheetHeader>
      <Container>
        termes et conditions d'utilisation
      </Container>
    </SheetContent>
  )
}