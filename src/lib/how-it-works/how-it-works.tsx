import { SliderContents } from '@/types/slider-contents';
import {
  HeartHandshake,
  NotebookPen,
  PartyPopper,
  SearchCheckIcon,
  Target,
  UserCheck,
  UserPlus,
} from 'lucide-react';

export const HowItWorks_SuscribeToTraining: SliderContents[] = [
  {
    Icon: UserPlus,
    title: 'Étape 1',
    description:
      'Inscrivez vous et explorez notre catalogue de formations pour trouver celle qui vous convient.',
  },
  {
    Icon: SearchCheckIcon,
    title: 'Étape 2',
    description:
      'Affinez votre recherche avec des filtres et envoyez une demande au formateur de votre choix.',
  },
  {
    Icon: UserCheck,
    title: 'Étape 3',
    description:
      'Confirmez votre inscription en effectuant le paiement après validation du formateur.',
  },
  {
    Icon: Target,
    title: 'Étape 4',
    description:
      'Commencez votre formation ou vous voulez dès la confirmation de votre inscription.',
  },
];

export const HowItWorks_BecomeATrainer: SliderContents[] = [
  {
    Icon: UserPlus,
    title: 'Étape 1',
    description:
      "Inscrivez vous et accédez au bouton 'Devenir Formateur' sur votre profil.",
  },
  {
    Icon: NotebookPen,
    title: 'Étape 2',
    description:
      'Complétez le formulaire avec vos informations personnelles et une brève biographie.',
  },
  {
    Icon: HeartHandshake,
    title: 'Étape 3',
    description:
      "Acceptez les conditions d'utilisation et créez vos cours sur la page 'Mes Formations'.",
  },
  {
    Icon: PartyPopper,
    title: 'Étape 4',
    description:
      'Décrivez le contenu de vos formations, publiez-les, et commencez à partager votre expertise.',
  },
];
