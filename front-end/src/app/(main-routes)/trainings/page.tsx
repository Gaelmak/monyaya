import { Container } from "@/ui/components/container/container";
import { SearchResults } from "@/ui/modules/search-result/search-result";

export default function Home() {
  
  return (
    <main>
      <Container className="px-4 md:px-8 my-[12vh]">
        <SearchResults/>
      </Container>
    </main>
  )
}
