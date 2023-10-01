import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

export const BestProfil = () => {
  let t = [{id:1, nom: 'Yves Boke'},{id:2, nom: 'Divine Ifuwa'},{id:3, nom: 'Marel Limaya'},{id:4, nom: 'Nathan Boke'}]
  return (
    <Container className="flex flex-row bg-gray-50 p-16 gap-4">
      {
        t.map(x => 
          <Container key={x.id} className="basis-1/4 flex flex-col p-4 bg-white gap-4">
            <Container className="h-48 bg-primary-950">Profil</Container>
            <Container>
              <Typography variant="title-base" component="h3">{x.nom}</Typography>
              <br/>
              <Typography variant="title-xs" component="h5">Domaine d'expertise</Typography>
              <br/>
              <Typography variant="title-xs" component="h5">Déscription</Typography>
              <Typography variant="body-sm" component="p">Date d'inscription : </Typography>
              <Typography variant="body-sm" component="p">Age : </Typography>
              <Typography variant="body-sm" component="p">Adresse : </Typography>
            </Container>
          </Container>
        )
      }
      
    </Container>
  )
}