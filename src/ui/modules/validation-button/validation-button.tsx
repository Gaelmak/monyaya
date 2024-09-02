'use client';
import { Buttons } from '@/ui/components/buttons/buttons';
import { Container } from '@/ui/components/container/container';
import {
  Archive,
  ArchiveRestore,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { Typography } from '@/ui/components/typography/typography';
import { useToast } from '@/components/ui/use-toast';
import UseLoading from '@/hooks/use-loading';
import { useRouter } from 'next/navigation';

interface Props {
  trainingId?: string;
  amLearner?: boolean;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
}

export const ValidationButton = ({
  status,
  trainingId,
  amLearner = false,
}: Props) => {
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const router = useRouter();

  function logIn() {
    toast({
      variant: 'default',
      title: 'Authentification requise',
      description: (
        <Typography component="p" variant="body-sm">
          Pour ajouter cette formation à votre panier, veuillez vous connecter
          ou créer un compte.
        </Typography>
      ),
      action: (
        <Buttons variant="primary" buttonType="link" baseUrl="/signin">
          Connexion
        </Buttons>
      ),
    });
  }

  async function handleTraining(id: string, status: string) {
    startLoading();
    const add = await fetch(`/api/learners/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    });

    if (add.status === 200) {
      toast({
        variant: 'success',
        title: 'Formation ajoutée !',
        description: (
          <Typography component="p" variant="body-sm">
            L'état de la formation a été modifié avec succès.
          </Typography>
        ),
      });
      stopLoading();
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur !',
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue durant la modification de l'état de la
            formation. Veuillez recommencer l'opération.
          </Typography>
        ),
      });
      stopLoading();
    }
    router.refresh();
  }

  async function rejectTraining(id: string) {
    startLoading();
    const add = await fetch(`/api/learners/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (add.status === 200) {
      toast({
        variant: 'success',
        title: 'Formation ajoutée !',
        description: (
          <Typography component="p" variant="body-sm">
            La formation a été annulée avec succès.
          </Typography>
        ),
      });
      stopLoading();
    } else {
      toast({
        variant: 'destructive',
        title: 'Erreur !',
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue durant l'annulation de la formation.
            Veuillez recommencer l'opération.
          </Typography>
        ),
      });
      stopLoading();
    }
    router.refresh();
  }

  return (
    <Container className="flex flex-row gap-2">
      {amLearner && (
        <Container className="flex flex-row gap-2">
          {status === 'PENDING' ? (
            <Buttons
              Icon={CalendarClock}
              className="text-white bg-orange-400 hover:bg-orange-400"
              isLoading={isLoading}
            />
          ) : status === 'REJECTED' ? (
            <Buttons
              Icon={CalendarX}
              className="text-white bg-red-400 hover:bg-red-400"
              isLoading={isLoading}
            />
          ) : status === 'ARCHIVED' ? (
            <Buttons
              Icon={Archive}
              className="text-white bg-red-400 hover:bg-red-400"
              isLoading={isLoading}
            />
          ) : (
            <Buttons
              Icon={CalendarCheck}
              className="text-white bg-primary-400 hover:bg-primary-400"
              isLoading={isLoading}
            />
          )}
          {status === 'PENDING' && (
            <Buttons
              Icon={Trash2}
              variant="ghost"
              className="text-red-500 hover:text-red-600"
              isLoading={isLoading}
              buttonType="action"
              action={() => rejectTraining(trainingId!)}
            />
          )}
        </Container>
      )}
      {status === 'PENDING' ? (
        <Buttons
          Icon={Check}
          isLoading={isLoading}
          buttonType="action"
          action={() => handleTraining(trainingId!, 'APPROVED')}
        />
      ) : (
        status !== 'ARCHIVED' && (
          <Buttons
            Icon={ArchiveRestore}
            isLoading={isLoading}
            buttonType="action"
            action={() => handleTraining(trainingId!, 'ARCHIVED')}
          />
        )
      )}
    </Container>
  );
};
