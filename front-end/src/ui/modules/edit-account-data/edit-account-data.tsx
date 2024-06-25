'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { Container } from "@/ui/components/container/container";
import { Buttons } from "@/ui/components/buttons/buttons";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/components/ui/use-toast";
import { Typography } from "@/ui/components/typography/typography";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import DefaultAvatar from '../../../../public/default_avatar.jpg';
import { fromJSON } from 'postcss';

interface Props {
  data: {
    image: string;
  };
  name: string;
}

export const EditAccountData = ({ name, data }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    startLoading();

    const formData = new FormData();
    formData.append('file', selectedImage!);
    formData.append('name', name);
    formData.append('folder', 'Profil');

    if (!selectedImage) return;

    try {
      const response = await fetch('/api/upload', {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data.fileUrl);
      if (data.status === 200) {
        const url = data.fileUrl
        const uploadProfil = await fetch(`/api/user/userimage/${name}`, {
          method: 'PATCH',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          })
        })

        if(uploadProfil.status === 200) {
          toast({
            variant: "success",
            title: "Succes",
            description: <Typography component="p" variant="body-sm">Votre image de profil a été modifié avec succès </Typography>,
          })
          
          setSelectedImage(null);
          stopLoading()
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.</Typography>,
          })

          setSelectedImage(null);
          stopLoading()
        }
      }
      stopLoading();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.</Typography>,
      })
      setSelectedImage(null);
      stopLoading();
    }

    setSelectedImage(null);
    stopLoading();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container 
        className={clsx("flex flex-col gap-2 p-4")}
      > 
        <Container className={clsx("w-full flex flex-col gap-2 lg:gap-4 items-center")}>
          <Container className="relative w-[24rem] h-[24rem] p-2 flex justify-center items-center overflow-hidden z-10">
            <Container className="w-full h-full rounded-full overflow-hidden">
              <Image 
                width={100}
                height={100}
                src={preview ? preview : data.image ? data.image : DefaultAvatar}
                alt="User profile image"
                className="h-full w-full object-cover "
              />
            </Container>
          </Container>
          <Container>
            <Container className="flex flex-col gap-4 lg:flex-row justify-between items-center">
              <label htmlFor="profil" className='cursor-pointer text-gray-500 hover:text-primary-Default animate'>
                Selectionnez une photo...
              </label>
              <input type="file" accept="image/*" id='profil' onChange={handleImageChange} className='hidden'/>
              <Buttons disabled={!preview} type='submit' isLoading={isLoading}>
                Enregistrer
              </Buttons>
            </Container>
          </Container>
        </Container>
      </Container>
    </form>
  );
};
