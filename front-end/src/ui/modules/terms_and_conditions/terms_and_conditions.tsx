/* eslint-disable react/no-unescaped-entities */
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"



export const TermsAndConditions = () => {
  return(
    <SheetContent side={"bottom"} className="bg-white w-full flex flex-col gap-8 lg:px-80 h-2/3 overflow-y-scroll ">
      <SheetHeader>
        <SheetTitle>
          <Typography component="h3" variant="title-base">Termes et conditions d'utilisation</Typography>
        </SheetTitle>
        <Typography component="h5" variant="title-sm" >Contrat de prestation de services d'apprentissage à domicile</Typography>
      </SheetHeader>
      <Container>
        <Container  className="overflow-y">
          <span className="font-semibold">Entre :</span><br/>
          <p>Monyaya, société par actions simplifiée dont le siège 
          social est situé [adresse], représentée par [nom du représentant 
          légal], en qualité de [fonction]</p><br /> 
          <span className="font-semibold pt-2">D'une part,</span><br/>
          et <br/>
          [Nom du prestataire], [qualité du prestataire], demeurant [adresse],<br/>
          <span className="font-semibold pt-2">D'autre part,</span>
          <p>il a été conclu le présent contrat de prestation de services d'apprentissage à domicile, ci-après dénommé le <span className="font-semibold pt-2">"Contrat"</span></p>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 1
              </span> 
              Objet du Contrat
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
               Le présent Contrat a pour objet la prestation de services d'apprentissage 
               à domicile par [Nom du prestataire] à des clients de Monyaya.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 2
              </span> 
                Définitions
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
              Aux fins du présent Contrat, les termes suivants ont la signification suivante :
              <ul className="pl-4 flex flex-col gap-2">
                <li>"Client" : désigne un client de Monyaya, bénéficiaire des services d'apprentissage à domicile</li>
                <li>
                  "Monyaya" : désigne la société Monyaya, prestataire des services 
                   d'apprentissage à domicile.
                </li>
                <li>"Prestataires ou yaya" : désigne : Nom du prestataire, prestataire des services d'apprentissage à domicile.</li>
              </ul>
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 3
              </span> 
              Obligations de Monyaya
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            Monyaya s'engage à mettre en relation [Nom du prestataire] avec 
            des clients en recherche de services d'apprentissage à domicile.
            Monyaya s'engage également à payer [Nom du prestataire] pour les 
            services d'apprentissage à domicile qu'il fournit aux clients.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 4
              </span> 
              Obligations de Nom du prestataire
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            [Nom du prestataire] s'engage à fournir des services d'apprentissage à 
            domicile conformes aux exigences des clients et aux standards de qualité 
            de Monyaya. [Nom du prestataire] s'engage également à respecter les consignes 
            de Monyaya et à collaborer avec elle afin de garantir la réussite des apprentissages.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 5
              </span> 
              Non-concurrence
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            [Nom du prestataire] s'engage à ne pas entrer en contact avec un client 
            de Monyaya de manière personnelle afin de lui proposer ses services d'apprentissage 
            à domicile. Cette obligation s'applique même si c'est le client qui prend l'initiative 
            de contacter [Nom du prestataire].
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 6
              </span> 
              Prix et modalités de paiement
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
              [Nom du prestataire] est rémunéré par Monyaya au prix de [montant] 
              dollar par module de service d'apprentissage à domicile.
              Le paiement des services est effectué par Monyaya à [Nom du prestataire] 
              au plus tard [délai] jours après la fin de chaque mois.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 7
              </span> 
              Durée du Contrat
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            Le présent Contrat est conclu pour une durée de [durée] mois.
            Le Contrat est renouvelable par tacite reconduction pour une durée 
            de [durée] mois, sauf dénonciation par l'une ou l'autre des parties 
            par lettre recommandée avec accusé de réception au moins [délai] mois 
            avant l'expiration du Contrat.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 8
              </span> 
              Résiliation du Contrat
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            Le Contrat peut être résilié à tout moment par l'une ou l'autre des parties, 
            moyennant un préavis de [délai] mois. La résiliation du Contrat peut également 
            intervenir de plein droit en cas de manquement grave à l'une des obligations des parties. 
            En outre, [Nom du prestataire] s'engage à ne pas conclure un contrat de prestation de services 
            d'apprentissage à domicile avec un concurrent de Monyaya pendant la durée du présent Contrat, y 
            compris pendant la période de préavis.
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 9
              </span> 
              Litiges
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
              Tout litige relatif au présent Contrat sera soumis à la compétence 
              exclusive des tribunaux de [ville]
            </Typography>
          </Container>
          <Container>
            <Typography className="my-4 text-[#39ae44]" variant='title-sm'>
              <span className="text-semibold text-[#545454] mr-4">
                Article 10
              </span> 
              Dispositions générales
            </Typography>
            <Typography className='leading-relaxed' variant='body-base'>
            Toute modification du présent Contrat doit être faite par écrit et signée par les deux parties.
            </Typography>
          </Container>
        </Container>
        <Container className=" flex flex-col my-4">
           <Typography className="flex flex-col  gap-1 ">
              <span className="font-bold">Fait à Kinshasa, le [date]</span>
              <span className="font-bold">deux exemplaires</span> 
              <span className="font-bold">Pour Monyaya </span>
              <span>[Nom du représentant légal]</span>
              <span className="font-bold">Pour [Nom du prestataire]</span>
              <span>[Nom du prestataire]</span>
           </Typography>
           <Container className="flex flex-row justify-between items-center">
            {/* <Buttons type='submit'>Obtenir mon exemplaire</Buttons> */}
          </Container>
        </Container>
      </Container>
    </SheetContent>
  )
}