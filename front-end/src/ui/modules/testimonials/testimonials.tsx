import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

export const Testimonials = () => {
  return (
    <Container className="p-6">
      <Container className="w-full text-center">
        <Typography variant="title-lg" component="h2">Ce qu'ils pensent de nous :</Typography>
      </Container>
    </Container>
  )
}