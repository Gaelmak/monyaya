"use client"; // Ajouter cette ligne au début

import { Container } from "@/ui/components/container/container";
import { SearchResults } from "@/ui/modules/search-result/search-result";
import { userAuth } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";

export default function AllCourses() {
  // Récupération de la session utilisateur
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Gérer l'état de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Gérer l'état d'erreur
  if (error) {
    return <div>Une erreur est survenue: {(error as Error).message}</div>;
  }

  // Gérer l'état d'erreur
  if (error) {
    return <div>Une erreur est survenue: {(error as Error).message}</div>;
  }
  console.log(course);

  return (
    <main>
      <Container className="px-4 lg:px-[7vw] my-[12vh] h-screen">
        <SearchResults
          session={null}
          MyCourses={null} // À adapter selon vos besoins
          courses={course} // Utilisation des données des cours récupérés
        />
      </Container>
    </main>
  );
}
