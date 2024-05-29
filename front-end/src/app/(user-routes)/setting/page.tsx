import { Container } from "@/ui/components/container/container";
import { EditUsersData } from "@/ui/modules/edit-users-data/edit-users-data";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { EditAccountData } from "@/ui/modules/edit-account-data/edit-account-data";

export default async function Home() {
  const session = await getServerSession(authOptions)
  const userId = await prisma!.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      id: true
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: userId!.id
    },
    select: {
      name: true,
      lastName: true,
      firstName: true,
      email: true,
      image: true,  
      phoneNumber: true,
      bio: true,
      avenue: true,
      district: true,
      municipality: true,
      number: true,
      password: true,
    }
  })

  return (
    <main className="flex flex-col lg:flex-row gap-4 p-4 mt-16 lg:mt-0">
      {
      user && 
      <>
        <Container className="lg:basis-1/2">
          <EditUsersData 
            name={user.name ? user.name : ''}
            data={{
              firstname: user.firstName ? user.firstName : '',
              lastname: user.lastName ? user.lastName : '',
              email: user.email ? user.email : '',
              avenue: user.avenue ? user.avenue : '',
              district: user.district ? user.district : '',
              municipality: user.municipality ? user.municipality : '',
              number: user.number ? user.number : '',
              phonenumber: user.phoneNumber ? user.phoneNumber : ''
            }}
          />
        </Container>
        <Container className="lg:basis-1/2">
          {/* <EditAccountData
            name={user.name ? user.name : ''}
            data={{
              image: user.image? user.image : '',
            }}
          /> */}
        </Container>
      </>
      }
    </main>
  )
}