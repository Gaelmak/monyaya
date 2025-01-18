import { AppLinks } from "@/types/app-links";
import { Presentation, Home, Settings2 } from "lucide-react";

export const MainRoutes: AppLinks[] = [
  {
    title: "Accueil",
    baseUrl: "/",
  },
  {
    title: "Formations",
    baseUrl: "/courses",
  },
  {
    title: "À propos",
    baseUrl: "/about",
  },
  {
    title: "Contact",
    baseUrl: "/contact",
  },
];

export const SocialNetworks: AppLinks[] = [
  {
    title: "LinkedIn",
    baseUrl: "https://www.linkedin.com/company",
    CustomIcon: "/icons/linkedin.png",
  },
  {
    title: "Facebook",
    baseUrl: "https://www.facebook.com/",
    CustomIcon: "/icons/facebook.png",
  },
  {
    title: "X",
    baseUrl: "https://www.instagram.com/",
    CustomIcon: "/icons/x.png",
  },
];

export const Company: AppLinks[] = [
  {
    title: "Politique de confidentialité",
    baseUrl: "/privacy-policy",
  },
  {
    title: "Termes d'utilisation",
    baseUrl: "/terms-of-use",
  },
];

export const AsideRoutes: AppLinks[] = [
  {
    title: "Dashboard",
    children: [
      {
        title: "Tableau de bord",
        baseUrl: "/dashboard",
        Icon: Presentation,
      },
      {
        title: "Paramètres",
        baseUrl: "/setting",
        Icon: Settings2,
      },
    ],
  },
];

export const HomeRoute: AppLinks[] = [
  {
    title: "Retourner à l'accueil",
    baseUrl: "/",
    Icon: Home,
  },
];
