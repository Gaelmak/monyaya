import { Container } from "@/ui/components/container/container";
import Image from "next/image";
import howItWork from '../../../../public/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png'
import { Typography } from "@/ui/components/typography/typography";
import { HowItWorks_SuscribeToTraining } from "@/lib/how-it-works/how-it-works";

export default function HowItWorks(){
    return(
        <Container className=" flex flex-col justify-center items-center pt-10 " variant="Glass-Effect">
            <Typography className="text-[#39ae44]" component="h4" variant='title-lg'>Comment ca marche?</Typography>
            <Container className=" container flex flex-col lg:flex-row justify-between items-center py-10 ">
                <ul className="md:w-4/5 flex flex-col gap-8 font-medium text-lg text-justify cursor-pointer ">
                {HowItWorks_SuscribeToTraining.map((training, index) => (
                    <li  key={index} className="hover:text-[#39ae44] flex justify-start items-center gap-2 before:bg-slate-700 before:content-['✓'] before:text-green-500 before:font-bold before:border-2 before:rounded-full before:px-2 before:py-[0.10rem] ">
                        {training.description}
                    </li>
                ))}
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