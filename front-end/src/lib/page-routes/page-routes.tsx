import { AppLinks } from "@/types/app-links"
import { Presentation, Home, Settings2 } from "lucide-react"
import Linkedin from '../../../public/icons/linkedin.png'
import Facebook from '../../../public/icons/facebook.png'
import Youtube from '../../../public/icons/youtube.png'
import X from '../../../public/icons/TwitterX.png'

export const MainRoutes: AppLinks[] = [
  {
    title: 'Acceuil',
    baseUrl: '/'
  },
  {
    title: 'Formations',
    baseUrl: '/trainings'
  },
  {
    title: 'A propos',
    baseUrl: '/about'
  },
]

export const SocialNetworks: AppLinks[] = [
  {
    title: 'LinkedIn',
    baseUrl: 'https://www.linkedin.com/company',
    CustomIcon: Linkedin,
  },
  {
    title: 'Facebook',
    baseUrl: 'https://www.facebook.com/company',
    CustomIcon: Facebook,
  },
  {
    title: 'X',
    baseUrl: 'https://www.x.com/company',
    CustomIcon: X,
  },
  {
    title: 'Youtube',
    baseUrl: 'https://www.youtube.com/company',
    CustomIcon: Youtube,
  }
]

export const Company: AppLinks[] = [
  {
    title: "A propos de nous",
    baseUrl: '/about-us',
  },
  {
    title: "Nos valeurs",
    baseUrl: '/values'
  },
  {
    title: "Contact",
    baseUrl: '/contact',
  },
  {
    title: 'Mentions legales',
    baseUrl: '/legal-notices'
  },
  {
    title: "Termes d'utilisation",
    baseUrl: '/terms-of-use'
  }
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
    title: "Retourner à l'acceuil",
    baseUrl: '/',
    Icon: Home 
  },
]
