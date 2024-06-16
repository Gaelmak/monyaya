import { Container } from "@/ui/components/container/container";
import Image from "next/image";
import howItWork from '../../../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png'
import { Typography } from "@/ui/components/typography/typography";

export default function HowItWorks(){
    return(
        <Container className=" flex flex-col justify-center items-center pt-10 " variant="Glass-Effect">
            <Typography className="text-[#39ae44]" component="h4" variant='title-lg'>Comment ca marche?</Typography>
            <Container className=" container flex flex-col lg:flex-row justify-between items-center py-10 ">
                <ul className="md:w-4/5 flex flex-col gap-8 font-medium text-lg text-justify ">
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem] ">
                        Inscrivez-vous sur notre site internet et Choisissez le yaya qui propose 
                        un programme de cours adapté à vos besoins et à votre budget.
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]" >
                        Passez votre commande de service,  Le yaya est informé de votre demande 
                        et l'accepte
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]"> 
                        Le yaya vous contactera via la messagerie du site pour discuter de l'heure 
                        et de l'endroit qui vous conviennent.
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]"> 
                        Une fois conclus, payez le montant total de votre commande, qui sera bloqué 
                        sur votre compte.
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]">
                        Le yaya vient dispenser le service demandé.</li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]"> 
                        À mi-parcours du service, vous donnez votre accord pour effectuer un premier 
                        paiement
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]">
                        À la fin du service, vous confirmez que tout s'est déroulé comme prévu pour 
                        procéder au paiement complet.
                    </li>
                    <li className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem]1">
                        Si vous êtes satisfait, laissez une évaluation pour partager votre expérience. 
                        Et profitez pleinement de vos nouvelles compétences dans votre vie quotidienne.
                    </li>
                    
                </ul>
                <Container className=" block">
                    <Image 
                        src={howItWork}
                        width={500}
                        alt="imageHowItWork"
                    />
            </Container>
            </Container>
        </Container>
    )
}