'use client';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { RegisterFormFieldsType } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputField } from '@/ui/components/input-field/input-field';
import { Container } from '@/ui/components/container/container';
import { Buttons } from '@/ui/components/buttons/buttons';
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  Pen,
  Phone,
  User,
  UserPlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { saltPassword } from '@/lib/password-to-salt';
import UseLoading from '@/hooks/use-loading';
import { useToast } from '@/components/ui/use-toast';
import { Typography } from '@/ui/components/typography/typography';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

export const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isFormAddFilled, setIsFormAddFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterFormFieldsType>>({
    resolver: zodResolver(RegisterFormFieldsType),
    defaultValues: {
      name: '',
      password: '',
      confirmpassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormFieldsType>) {
    startLoading();

    const { name, password, confirmpassword } = values;
    if (password !== confirmpassword) {
      toast({
        title: 'Mot de passe ne correspondent pas',
        description: (
          <Typography component="p" variant="body-sm">
            Veuillez vous assurer de bien avoir confirmé votre mot de passe
          </Typography>
        ),
      });
      stopLoading();
    } else {
      const saltedPassword = saltPassword(password);
      const hash = saltedPassword.hash;
      const salt = saltedPassword.salt;
      const registration = await fetch(`/api/user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          hash,
          salt,
        }),
      });

      if (registration.status === 200) {
        const loginRespose = await signIn('credentials', {
          name: name,
          password: password,
          redirect: false,
        });
        if (loginRespose?.status === 200) {
          toast({
            variant: 'success',
            title: 'Connexion réussie',
            description: 'Content de vous revoir !',
          });
          stopLoading();
          router.push('/dashboard');
        } else {
          toast({
            variant: 'destructive',
            title: 'Une erreur est survenue',
            description: (
              <Typography component="p" variant="body-sm">
                Votre nom d'utilisateur ou votre mot de passe a été saisi
                incorrectement. Veuillez réessayer.
              </Typography>
            ),
          });
          stopLoading();
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Utilisateur déjà existant',
          description: (
            <Typography component="p" variant="body-sm">
              Veuillez utiliser une autre adresse email
            </Typography>
          ),
        });
        stopLoading();
      }
    }
    stopLoading();
  }

  const ShowPasswordButton = (visibility: boolean) => {
    if (visibility) {
      return (
        <EyeOff
          className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    } else {
      return (
        <Eye
          className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    }
  };

  const PasswordIcon = () => {
    return (
      <Lock className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const UserIcon = () => {
    return (
      <User className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const MailIcon = () => {
    return (
      <Mail className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  const PhoneIcon = () => {
    return (
      <Phone className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-8 ')}
      >
        <Container className={clsx('flex flex-col gap-2')}>
          <Container className={clsx('w-full flex flex-col gap-2 lg:gap-4')}>
            <Container>
              <InputField
                placeholder="@JohnD12"
                control={form.control}
                name="name"
                label="Nom d'utilisateur"
                description={
                  <>
                    <span className="text-body-sm flex flex-col gap-1">
                      <span>
                        * Assurez-vous de choisir un nom d'utilisateur que vous
                        pourrez facilement mémoriser mais qui reste suffisamment
                        unique pour être accepté par notre système.
                      </span>
                      <span>
                        * Il doit avoir au moins 2 caractères et peut contenir
                        des lettres, des chiffres et des symboles.
                      </span>
                    </span>
                  </>
                }
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container
              className={clsx(
                'w-full flex flex-col lg:flex-row gap-2 lg:gap-4'
              )}
            >
              <Container className="lg:basis-1/2">
                <InputField
                  placeholder="••••••••"
                  control={form.control}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Mot de passe"
                  className="pr-12"
                >
                  {PasswordIcon()}
                  {ShowPasswordButton(showPassword)}
                </InputField>
              </Container>
              <Container className="lg:basis-1/2">
                <InputField
                  placeholder="••••••••"
                  control={form.control}
                  name="confirmpassword"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirmer le mot de passe"
                >
                  {PasswordIcon()}
                </InputField>
              </Container>
            </Container>
          </Container>
        </Container>
        <Container className="flex flex-col justify-between items-center gap-2">
          <Buttons
            type="submit"
            Icon={UserPlus}
            isLoading={isLoading}
            className="w-full"
          >
            S'inscrire
          </Buttons>
          <Typography variant="body-sm" className="pt-8">
            Vous avez un compte ? Connectez vous.
          </Typography>
          <Buttons
            buttonType="link"
            baseUrl="/signin"
            Icon={LogIn}
            variant="ghost"
            outline="outline"
            className="text-secondary-Default w-full"
          >
            Se connecter
          </Buttons>
        </Container>
      </form>
    </Form>
  );
};
