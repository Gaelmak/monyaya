import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Container } from "@/ui/components/container/container";
import aboutImage from '../../../../public/Hero-Img-from-About2.0.png'
import { Typography } from "@/ui/components/typography/typography";


export default function CompanyOverview(){
    return(
        <Container className='container flex justify-between flex-col lg:flex-row  items-center  '>
          <Container className="py-4">
            <Typography className='text-[#737373]' component='span' variant='title-sm'>A propos de nous</Typography>
            <Typography className="md:w-3/4 py-2" component="h3" variant='title-lg'> 
            Cʼest quoi monyaya ?
            </Typography>
            <Container> 
                <Typography className="py-4 text-justify md:text-left tracking-wide leading-relaxed" component='p' variant='body-base'>
              Monyaya est bien plus qu'une simple plateforme de mise en relation. C'est une communauté dynamique qui connecte les passionnés 
              et les apprenants à travers des services d'apprentissage disponibles directement au domicile du client ou dans tout autre lieu de 
              son choix. Notre objectif est de créer des connexions significatives entre ceux qui souhaitent apprendre et ceux qui possèdent les 
              connaissances nécessaires, en leur offrant un service personnalisé répondant à leurs besoins réels.
              </Typography>
              <Typography className="py-4 text-justify md:text-left tracking-wide leading-relaxed" component='p' variant='body-base'>
              <span>Alors, Apprenez ce que vous aimez et où vous voulez </span>:
              Que vous rêviez d'apprendre un instrument de musique, de maîtriser une nouvelle langue étrangère ou de perfectionner une 
              compétence particulière, nous mettons  à votre disposition des experts qualifiés quʼon appelle ici “yayaˮ, dʼoù le nom de 
              “mon_yayaˮ, prêts à partager leur passion, chez vous ou dans le lieu de votre choix.
              </Typography>
            </Container>
           
          </Container>
          <Container className="">
            <BgImg src={aboutImage} alt={"aboutUs"} className="w-[20rem] h-[30rem] md:w-[25rem] md:h-[30rem] lg:w-[32rem] lg:h-[32rem] overflow-hidden" classNameImg="w-full h-full"/>
          </Container>
        </Container>
    )
}