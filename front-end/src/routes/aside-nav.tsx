import { Container } from "@/ui/components/container/container"
import { AsideActiveLink } from "./aside-active-link"
import { AsideRoutes, HomeRoute } from "@/lib/page-routes/page-routes"
import { Typography } from "@/ui/components/typography/typography"
import { SignOutButton } from "./auth-buttons"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import Image from "next/image"
import DefaultAvatar from "../../public/default_avatar.jpg"

export const AsideNav = async () => {
  const session = await getServerSession(authOptions)

  return (
    <Container className="h-full w-full flex flex-col justify-between">
      <Container className="w-full p-4">
        <Container className="w-full p-4 flex flex-row items-center bg-primary-50 gap-2 rounded">
          <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
            <Image 
              width={40} 
              height={40} 
              src={session!.user!.image ? session!.user!.image : DefaultAvatar}
              alt="User profile image"
            /> 
          </Container>
          <Container>
            <Typography variant="title-sm" component="h4" className="">{session!.user!.name!}</Typography>
            <Typography variant="body-sm" className="text-black/20">{session!.user!.email!}</Typography>
          </Container>
        </Container>
        <Container className="pt-4">
        {
          AsideRoutes.map(({children}) => (
            children!.map(({title, baseUrl, Icon}) => (
              <Container key={title}>
              <Typography variant="body-base" component="p" className="w-full text-black/60">
                <AsideActiveLink href={baseUrl!}>
                  {
                    Icon ?
                    <span className="flex flex-row items-center">
                      <Icon  className="mr-4 h-5 w-5"/>{title}
                    </span>
                    :
                    <>
                      {title}
                    </>
                  }
                  
                </AsideActiveLink>
              </Typography>
              </Container>
            ))
          ))
        }
        </Container>
      </Container>
      <Container className="p-4">
        {
          HomeRoute.map(({title, baseUrl, Icon}) => (
            <Container key={title}>
            <Typography variant="body-base" component="p" className="w-full text-black/60">
              <AsideActiveLink href={baseUrl!}>
                {
                  Icon ?
                  <span className="flex flex-row items-center">
                    <Icon  className="mr-4 h-5 w-5"/>{title}
                  </span>
                  :
                  <>
                    {title}
                  </>
                }
                
              </AsideActiveLink>
            </Typography>
            </Container>
          ))
        }
        <SignOutButton className="bg-white text-red-400 hover:bg-white hover:text-red-500 justify-start p-2 w-full"/>
      </Container>
    </Container>
  )
}