import { SliderContents } from "@/types/slider-contents";
import { CheckCircle, FormInput, HelpCircle } from "lucide-react";

export const HowItWorks : SliderContents[] = [
  {
    id: 0,
    title: 'Découvrez comment ça marche',
    bgColor: 'bg-primary-200',
    Icon: HelpCircle
  },
  {
    id: 1,
    title: 'Etape 1',
    description: 'Du texte blablabla',
    bgColor: 'bg-primary-200'
  },
  {
    id: 2,
    title: 'Etape 2',
    description: 'Du texte blablabla',
    bgColor: 'bg-primary-200'
  },
  {
    id: 3,
    title: 'Etape 3',
    description: 'Du texte blablabla',
    bgColor: 'bg-primary-200'
  },
  {
    id: 4,
    title: 'Etape 4',
    description: 'Du texte blablabla',
    bgColor: 'bg-primary-200'
  },
  {
    id: 5,
    bgColor: 'bg-primary-Default',
    Icon: CheckCircle,
    color: 'text-white'
  }
]