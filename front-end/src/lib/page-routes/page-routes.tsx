import { AppLinks } from "@/types/app-links"
import { Presentation, Home, Settings2, LibraryBig } from "lucide-react"

export const MainRoutes: AppLinks[] = [
  {
    title: 'Acceuil',
    baseUrl: '/'
  },
  {
    title: 'Services',
    baseUrl: '/services'
  },
  {
    title: 'A propos',
    baseUrl: '/about'
  },
]

export const AsideRoutes: AppLinks[] = [
  {
    title: 'Dashboard',
    children: [
      {
        title: 'Profil',
        baseUrl: '/dashboard',
        Icon: Presentation
      }
    ]
  },
  {
    title: 'Setting',
    children: [
      {
        title: 'Paramètres',
        baseUrl: '/setting',
        Icon: Settings2
      },
    ]
  },
]

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'acceuil",
    baseUrl: '/',
    Icon: Home 
  },
]
