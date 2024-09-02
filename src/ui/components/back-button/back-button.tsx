'use client';
import { Buttons } from '@/ui/components/buttons/buttons';
import { MoveLeft, Home } from 'lucide-react';

interface Props {
  backTo: string;
  icon?: 'default' | 'home';
  children?: React.ReactNode;
  className?: string;
}

export const BackButton = ({
  backTo,
  icon = 'default',
  children,
  className,
}: Props) => {
  return (
    <>
      {children ? (
        <Buttons
          Icon={icon == 'default' ? MoveLeft : Home}
          variant="secondary"
          buttonType="link"
          baseUrl={backTo}
          className={className}
        >
          {children}
        </Buttons>
      ) : (
        <Buttons
          Icon={icon == 'default' ? MoveLeft : Home}
          variant="secondary"
          buttonType="link"
          baseUrl={backTo}
          className={className}
        />
      )}
    </>
  );
};
