import { Container } from "@/ui/components/container/container";
import { EditUsersData } from "@/ui/modules/edit-users-data/edit-users-data";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { EditAccountData } from "@/ui/modules/edit-account-data/edit-account-data";
import { Typography } from "@/ui/components/typography/typography";
import { EditAddressData } from "@/ui/modules/edit-address-data/edit-address-data";

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
    <main className="flex flex-col justify-center items-center gap-4 p-4 lg:m-0 mt-16 lg:mt-0 lg:h-[100vh]">
      {
      user && 
      <Container className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4 p-4 bg-white rounded lg:w-full lg:h-full ">
        <Container className="lg:basis-1/2">
          <EditAccountData
            name={user.name ? user.name : ''}
            data={{
              image: user.image? user.image : '',
            }}
          />
        </Container>
        <Container className="lg:basis-1/2 flex flex-col gap-8 p-8 lg:p-0">
          <EditUsersData 
            name={user.name ? user.name : ''}
            data={{
              firstname: user.firstName ? user.firstName : '',
              lastname: user.lastName ? user.lastName : '',
              email: user.email ? user.email : '',
              phonenumber: user.phoneNumber ? user.phoneNumber : ''
            }}
          />
          <EditAddressData
            name={user.name ? user.name : ''}
            data={{
              avenue: user.avenue ? user.avenue : '',
              district: user.district ? user.district : '',
              municipality: user.municipality ? user.municipality : '',
              number: user.number ? user.number : '',
            }}
          />
        </Container>
      </Container>
      }
    </main>
  )
}