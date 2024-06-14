import Image from 'next/image'
import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/components/typography/typography';
import aboutImage from '../../../../public/Hero-Img-from-About2.0.png'


export default function Home() {
  return (
    <main>
      <Container className=''>
        <Container className='container flex justify-between flex-col items-center  '>
          <Container className="py-4">
            <Typography className='text-[#737373]' component='span' variant='title-sm'>About us </Typography>
            <Typography className="" component="h3" variant='title-lg'> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Voluptatum nemo.
            </Typography>
            <Typography className="py-4 text-justify" component='p' variant='body-base'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Ut perferendis voluptates molestiae necessitatibus! Quaerat
            minus, illo quia veniam voluptate eos voluptatem aut animi
            cupiditate dolorem culpa dignissimos explicabo minima praesentium
            incidunt quis amet necessitatibus perspiciatis velit, eum asperiores
            impedit nesciunt blanditiis maxime. Quaerat accusamus quibusdam nihil 
            debitis illo nam voluptate sed commodi ab ipsa facere dolore consectetur, 
            eos magni eum odio saepe blanditiis quo repellendus harum aliquam aperiam, 
            pariatur modi. Molestiae asperiores labore vero sint reprehenderit vitae rem 
            dolore ratione et, dolor architecto mollitia dolores neque, quisquam nemo cum 
            eius praesentium, beatae non veniam. Deserunt officiis optio modi cumque quas..
            </Typography>
          </Container>
          <Container>
            <BgImg src={aboutImage} alt={"aboutUs"} className="w-[30rem] h-[25rem] md:w-[32rem] md:h-[32rem] " classNameImg="w-full h-full"/>
          </Container>
        </Container>
        <Container className='px-8 md:px-8 py-24 flex flex-col gap-20 bg-secondary-50'>
          <Container className='flex justify-center items-center  flex-col bg-white rounded-2xl  shadow-2lg animate transition-all p-4' >
              <Typography className='text-[#39ae44] p-4' variant='title-base' component='h4'>
                Notre Mission
              </Typography>
              <Typography component='p' variant='body-base' className='text-justify p-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Voluptatum nemo sit maxime perferendis unde vero aliquam! 
              Ab deserunt, architecto ratione porro nostrum distinctio.
              </Typography>
          </Container>
          <Container className='flex justify-center items-center  flex-col bg-white rounded-2xl  shadow-2lg animate transition-all p-4'>
            <Typography className='text-[#39ae44]' variant="title-base" component='h4'>
              Notre Vision
            </Typography>
            <Typography variant="body-base" component='p' className='text-justify p-3'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Accusamus molestiae, incidunt dolores iste numquam ipsum 
              nostrum repudiandae voluptates earum deserunt, doloribus 
              voluptas eveniet eaque mollitia officiis tenetur vero? Esse, 
              nostrum!
            </Typography>
          </Container>
          <Container className='flex justify-center items-center  flex-col bg-white rounded-2xl  shadow-2lg animate transition-all p-4'>
            <Typography className='text-[#39ae44]' variant="title-base" component='h4'>
              Notre Vision
            </Typography>
            <Typography variant="body-base" component='p' className='text-justify p-3'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Accusamus molestiae, incidunt dolores iste numquam ipsum 
              nostrum repudiandae voluptates earum deserunt, doloribus 
              voluptas eveniet eaque mollitia officiis tenetur vero? Esse, 
              nostrum!
            </Typography>
          </Container>
        </Container>
        
      </Container>
    </main>
  )
}
