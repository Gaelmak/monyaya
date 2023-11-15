import { Options } from "@/types/options";
import { BookIcon, BookMarked, Coins, Landmark, Languages, Microscope, Music, Trophy } from "lucide-react";

export const CourseList : Options[] = [
  {
    id: 0,
    title: 'Langues',
    Icon: Languages,
    children: [
      {
        id: '0-1',
        label: 'Anglais'
      },
      {
        id: '0-2',
        label: 'Français'
      }
    ]
  },
  {
    id: 1,
    Icon: BookMarked,
    title: 'Répétiteurs',
    children: [
      {
        id: '1-1',
        label: 'École primaire'
      },
      {
        id: '1-2',
        label: 'École secondaire'
      }
    ]
  },
  {
    id: 2,
    Icon: Microscope,
    title: 'Scientifique (Humanités)',
    children: [
      {
        id: '2-1',
        label: 'Mathématiques'
      },
      {
        id: '2-2',
        label: 'Dessin scientifique'
      }
    ]
  },
  {
    id: 3,
    Icon: Coins,
    title: 'Commerciale (Humanités)',
    children: [
      {
        id: '3-1',
        label: 'Comptabilité générale'
      },
      {
        id: '3-2',
        label: 'Comptabilité des sociétés'
      },
      {
        id: '3-3',
        label: 'Comptabilité analytique'
      }
    ]
  },
  {
    id: 4,
    Icon: BookIcon,
    title: 'Littéraire (Humanités)',
    children: [
      {
        id: '4-1',
        label: 'Latin'
      }
    ]
  },
  {
    id: 5,
    title: 'Économie',
    Icon: Landmark,
    children: [
      {
        id: '5-1',
        label: 'Microéconomie'
      },
      {
        id: '5-2',
        label: 'Macroéconomie'
      }
    ]
  },
  {
    id: 6,
    title: 'Musique',
    Icon: Music,
    children: [
      {
        id: '6-1',
        label: 'Guitare'
      },
      {
        id: '6-2',
        label: 'Piano'
      }
    ]
  },
  {
    id: 7,
    title: 'Sport',
    Icon: Trophy,
    children: [
      {
        id: '7-1',
        label: 'Coach sportif'
      }
    ]
  },
]