import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

export const BestProfil = () => {
  let t = [
    {id:1, nom: 'Yves Boke', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id:3, name: 'HTML'}]},
    {id:2, nom: 'Divine Ifuwa', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id:3, name: 'HTML'}]},
    {id:3, nom: 'Marel Limaya', domains: [{id: 1, name: 'Mathematique'}, {id: 2, name: 'Geopolitique'}, {id: 4, name: 'Javascript'}]},
    {id:4, nom: 'Nathan Boke', domains: [{id: 1, name: '1'}, {id:3, name: '2'}, {id: 4, name: '3'}]},
  ]
  return (
    <Container className="bg-white_powder block overflow-hidden py-8 px-4 md:px-16 md:py-16">
      <Container>
        <Typography variant="title-base" component="h2">Nos meilleurs formateurs</Typography>
        <Typography variant="body-sm" component="p">
          Vous voulez apprendre de la meilleure façon ?<br/>
          Nos formateurs experts vous guideront vers la réussite.<br/>
          Découvrez leurs profils et choisissez celui qui vous convient.
        </Typography>
      </Container>
      <br/>
      <Container className="overflow-auto flex flex-row gap-4 md:gap-8">
      {
        t.map(x => 
          <Container key={x.id} className="basis-1/4 flex flex-col p-4 bg-white gap-4 items-center rounded">
            <Container className="h-[150px] w-[150px] bg-primary-950 rounded-full flex justify-center items-center">
              Profil
            </Container>
            <Container className="flex flex-col items-center">
              <Typography variant="title-sm" component="h3">{x.nom}</Typography>
            </Container>
            <Container className="text-center">
                {
                  x.domains.map(domain =>
                    <Typography key={domain.id} variant="body-sm" component="p" color="secondary">
                      {domain.name}
                    </Typography>
                  )
                }
            </Container>
            <Container>
              <Buttons variant="secondary">Voir le parcours</Buttons>
            </Container>
          </Container>
        )
      }
      </Container>
    </Container>
    
  )
}