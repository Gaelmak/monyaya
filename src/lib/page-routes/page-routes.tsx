import { AppLinks } from "@/types/app-links"
import { Presentation, Home, Settings2 } from "lucide-react"
import Linkedin from '../../../public/icons/linkedin.png'
import Facebook from '../../../public/icons/facebook.png'
import Youtube from '../../../public/icons/youtube.png'
import X from '../../../public/icons/TwitterX.png'

export const MainRoutes: AppLinks[] = [
  {
    title: 'Accueil',
    baseUrl: '/'
  },
  {
    title: 'Formations',
    baseUrl: '/trainings'
  },
  {
    title: 'À propos',
    baseUrl: '/about'
  },
  {
    title: 'Contact',
    baseUrl: '/contact'
  },
]

export const SocialNetworks: AppLinks[] = [
  {
    title: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/company',
    CustomIcon: Linkedin,
  }
]

export const Company: AppLinks[] = [
  {
    title: "Termes d'utilisation",
    baseUrl: '/terms-of-use'
  },
  {
    title: 'Devenir Formateur',
    baseUrl: '/'
  },
  {
    title: 'Newsletters',
    baseUrl: '/newsletters'
  },
  {
    title: 'Feedback',
    baseUrl: '/feedback'
  },
] 

export const AsideRoutes: AppLinks[] = [
  {
    title: 'Dashboard',
    children: [
      {
        title: 'Tableau de bord',
        baseUrl: '/dashboard',
        Icon: Presentation
      },
      {
        title: 'Paramètres',
        baseUrl: '/setting',
        Icon: Settings2
      }
    ]
  },
]

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'accueil",
    baseUrl: '/',
    Icon: Home 
  },
]
