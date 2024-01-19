import { AppLinks } from "@/types/app-links"
import { Presentation, Home, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

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
        title: 'Tableau de bord',
        baseUrl: '/dashboard',
        Icon: Presentation
      }
    ]
  },
  // {
  //   title: 'Historique',
  //   children: [
  //     {
  //       title: 'Commandes',
  //       baseUrl: '/Orders',
  //       Icon: Coins
  //     },
  //     {
  //       title: 'Vente cash',
  //       baseUrl: '/Cash-sale',
  //       Icon: Zap
  //     },
  //     {
  //       title: 'Livraison',
  //       baseUrl: '/Delivery',
  //       Icon: PackageCheck
  //     },
  //   ]
  // },
  
]

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'acceuil",
    baseUrl: '/',
    Icon: Home
      
  },
]
