'use client';

import { Container } from '../container/container';
import { Typography } from '../typography/typography';
import {
  SearchResultButtons,
  SearchResultTrainer,
} from '@/ui/modules/search-result/search-result-buttons';
import { BookOpenText, Calendar, Dot, List, Map } from 'lucide-react';
import DefaultAvatar from '../../../../public/default_avatar.jpg';
import { truncateText } from '@/lib/truncate-text';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import RekreationPaysage from '../../../../public/rekreatioonPaysage.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    createdAt: Date;
    _count: {
      modules: number;
    };
    user: {
      name: string;
      firstName: string | null;
      lastName: string | null;
      municipality: string | null;
      image?: string | null;
    };
    courses: {
      name: string;
    };
  }[];
  userId?: string;
  sessionName?: string;
  myLearnings?: {
    id: string;
    trainingId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  }[];
  className?: string;
}

export const TrainingsView = ({
  data,
  userId,
  sessionName,
  myLearnings,
  className,
}: Props) => {
  const pathname = usePathname();
  const visibleData = data.slice(0, 3);

  return (
    <Container className={clsx(className)}>
      {visibleData.map(
        ({ id, createdAt, image, name, price, _count, user, courses }) => (
          <Container
            key={id}
            className="group p-4 hover:cursor-pointer rounded-2xl overflow-hidden flex flex-col gap-2 justify-between bg-white animate"
          >
            <Link
              href={`/trainings/training/${id}`}
              className="rounded-2xl w-full relative md:w-auto aspect-video overflow-hidden flex justify-center items-center"
            >
              <Image
                width={100}
                height={100}
                src={image || RekreationPaysage}
                alt="Training image"
                className="h-full w-full object-cover group-hover:scale-150 animate"
              />
            </Link>
            <Container className="gap-4 flex flex-row justify-between">
              <Container className="flex items-center bg-primary-Default py-1 pr-2 rounded">
                <Dot />
                <Typography className="text-sm">{courses.name}</Typography>
              </Container>
              <Container className="flex items-center bg-primary-600 py-1 rounded px-2">
                <Calendar width={14} height={14} />
                <Typography className="text-sm">
                  {format(createdAt, 'dd MMMM yyyy', { locale: fr })}
                </Typography>
              </Container>
            </Container>
            <Link
              href={`/trainings/training/${id}`}
              className="w-3/4 text-black"
            >
              <Typography className="text-2xl font-bold">
                {truncateText(name, 65)}
              </Typography>
            </Link>
            <Container className="flex justify-start gap-8 items-center">
              <Container className="flex items-center gap-1">
                <BookOpenText
                  width={14}
                  height={14}
                  className="text-primary-600"
                />
                <Typography className="text-black text-sm">
                  10 classes
                </Typography>
              </Container>
              <Container className="flex items-center gap-1">
                <BookOpenText
                  width={14}
                  height={14}
                  className="text-primary-600"
                />
                <Typography className="text-black text-sm">
                  6 étudiants
                </Typography>
              </Container>
            </Container>
            <Link href={`/trainings/training/${id}`}>
              <Container className="flex flex-col border-b-2 pb-2">
                <Container className="flex justify-start gap-8 items-center">
                  <Container className="flex items-center gap-1">
                    <List width={14} height={14} className="text-primary-600" />
                    <Typography className="text-black text-sm">
                      {_count.modules}{' '}
                      {_count.modules > 1 ? 'Modules' : 'Module'}
                    </Typography>
                  </Container>
                  <Container className="flex items-center gap-1">
                    <Map width={14} height={14} className="text-primary-600" />
                    <Typography className="text-black text-sm">
                      {user?.municipality}
                    </Typography>
                  </Container>
                </Container>
              </Container>
            </Link>
            <Container className="flex justify-between">
              <Link href={`/trainings/training/${id}`}>
                <Typography className="text-primary-Default font-bold text-2xl">
                  ${price}
                </Typography>
              </Link>
              <Container className="flex items-center gap-2 text-primary-Default">
                <SearchResultButtons
                  userId={userId || null}
                  id={
                    myLearnings?.find((obj) => obj.trainingId === id)?.id ||
                    null
                  }
                  trainingId={id}
                  isMyAccount={sessionName === user?.name}
                  amLearner={
                    myLearnings?.some((obj) => obj.trainingId === id) || false
                  }
                  status={
                    myLearnings?.find((obj) => obj.trainingId === id)?.status ||
                    null
                  }
                />
                {pathname !== `/profil/${user?.name}` && (
                  <SearchResultTrainer
                    name={user?.name}
                    fullName={`${user?.firstName || ''} ${user?.lastName || ''}`}
                    image={user?.image || DefaultAvatar}
                    isMyAccount={sessionName === user?.name}
                  />
                )}
              </Container>
            </Container>
          </Container>
        )
      )}
    </Container>
  );
};
