import Image from 'next/image'
import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/components/typography/typography';
import aboutImage from '../../../../public/Hero-Img-from-About2.0.png'
import { Newsletter } from '@/ui/modules/newsletter/newsletter'


export default function Home() {
  return (
    <main>
      <Container className=''>
        <Container className='container flex justify-between flex-col lg:flex-row  items-center  '>
          <Container className="py-4">
            <Typography className='text-[#737373]' component='span' variant='title-sm'>A propos de nous</Typography>
            <Typography className="md:w-2/3 py-2" component="h3" variant='title-lg'> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Voluptatum nemo.
            </Typography>
            <Typography className="py-4 text-justify md:text-left tracking-wide leading-relaxed" component='p' variant='body-base'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, aliquam. Omnis fugit quaerat voluptatibus cupiditate 
            magnam sit excepturi sapiente? Similique laboriosam saepe non cupiditate ex in. Praesentium quia quam iure illo nemo sapiente 
            tenetur corporis sed magni reprehenderit magnam doloremque eveniet, incidunt quae repellat nisi quo laudantium dignissimos vel. 
            Quisquam nobis officiis architecto sequi nulla, ratione voluptatibus ea. Quasi ipsa quibusdam totam iusto, dolores eius, velit 
            assumenda doloribus incidunt natus molestias accusamus fugit ut quis! Placeat, enim. Repudiandae nostrum fuga itaque commodi 
            inventore voluptatum consequuntur aperiam alias, doloremque nemo illo corrupti repellat harum dolor, modi earum praesentium quas 
            soluta temporibus laboriosam exercitationem maxime, et dolorem. Voluptas, ad eveniet voluptate hic quod repellendus eligendi velit 
            quam ipsam fuga nobis, error nemo mollitia accusantium maiores corporis id! Modi libero aliquid, dolores alias beatae inventore, 
            nam harum quisquam laboriosam dignissimos facilis incidunt aliquam? Accusamus nostrum vitae iure ut consequuntur iusto explicabo 
            iste vero!
            </Typography>
          </Container>
          <Container className="">
            <BgImg src={aboutImage} alt={"aboutUs"} className="w-[25rem] h-[30rem] lg:w-[32rem] lg:h-[32rem] overflow-hidden" classNameImg="w-full h-full"/>
          </Container>
        </Container>
        <Container className='px-8 md:px-3  py-24 flex flex-col  md:flex-wrap lg:flex-nowrap  md:justify-center md:items-center lg:flex-row gap-20 bg-secondary-50'>
          <Container className='flex justify-center items-center  lg:w-1/3 md:w-full flex-col bg-white rounded-2xl  lg:shadow-2xl  p-4' >
              <Typography className='text-[#39ae44] p-4 ' variant='title-base' component='h4'>
                Notre Mission
              </Typography>
              <Typography component='p' variant='body-base' className='px-3 py-8 text-justify  lg:text-center tracking-wide leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Voluptatum nemo sit maxime perferendis unde vero aliquam! 
              Ab deserunt, architecto ratione porro nostrum distinctio.
              </Typography>
          </Container>
          <Container className='flex justify-center items-center  md:w-full lg:w-1/3  flex-col bg-white rounded-2xl  lg:shadow-2xl   p-4 md:p-2'>
            <Typography className='text-[#39ae44]' variant="title-base" component='h4'>
              Notre Vision
            </Typography>
            <Typography variant="body-base" component='p' className='text-justify px-3 py-8 lg:text-center tracking-wide leading-relaxed'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Accusamus molestiae, incidunt dolores iste numquam ipsum 
              nostrum repudiandae voluptates earum deserunt, doloribus 
              voluptas eveniet eaque mollitia officiis tenetur vero? Esse, 
              nostrum!
            </Typography>
          </Container>
          <Container className='flex justify-center items-center   md:w-full lg:w-1/3  flex-col bg-white rounded-2xl  lg:shadow-2xl md:p-2   p-4 '>
            <Typography className='text-[#39ae44]' variant="title-base" component='h4'>
              Notre Vision
            </Typography>
            <Typography variant="body-base" component='p' className='text-justify px-3 py-8  lg:text-center tracking-wide leading-relaxed'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Accusamus molestiae, incidunt dolores iste numquam ipsum 
              nostrum repudiandae voluptates earum deserunt, doloribus 
              voluptas eveniet eaque mollitia officiis tenetur vero? Esse, 
              nostrum!
            </Typography>
          </Container>
        </Container>
        <Newsletter/>
      </Container>
    </main>
  )
}
