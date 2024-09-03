'use client';
import { Container } from '@/ui/components/container/container';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { NewTrainingFormFieldsType } from '@/types/forms';
import { InputField } from '@/ui/components/input-field/input-field';
import { Typography } from '@/ui/components/typography/typography';
import { Buttons } from '@/ui/components/buttons/buttons';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import UseLoading from '@/hooks/use-loading';
import { InputFieldSelect } from '@/ui/components/input-field-select/input-field-select';
import { Options } from '@/types/options';
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import DefaultAvatar from '../../../../public/default_avatar.jpg';

interface Props {
  options: Options[];
  userId: string;
}

export const AddCours = ({ options, userId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof NewTrainingFormFieldsType>>({
    resolver: zodResolver(NewTrainingFormFieldsType),
    defaultValues: {
      training_name: '',
      training_description: '',
      chapters: [{ title: '', description: '' }],
      price: 0,
      category: '',
    },
  });

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

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    name: 'chapters',
    control,
  });

  async function onSubmit(values: z.infer<typeof NewTrainingFormFieldsType>) {
    startLoading();
    const { training_name, training_description, chapters, price, category } =
      values;

    const formData = new FormData();
    formData.append('file', selectedImage!);
    formData.append('name', userId + '_' + training_name);
    formData.append('folder', 'Trainings');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 200) {
        const url = data.fileUrl;
        const addTraining = await fetch(`/api/training`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            training_name,
            training_description,
            chapters,
            price,
            category,
            image: url,
          }),
        });

        if (addTraining.status === 200) {
          toast({
            variant: 'success',
            title: 'Youpi !',
            description: (
              <Typography component="p" variant="body-sm">
                Votre formation a été ajoutée avec succès
              </Typography>
            ),
          });
          stopLoading();
          router.push('/my-trainings');
        } else {
          toast({
            variant: 'destructive',
            title: 'Erreur !',
            description: (
              <Typography component="p" variant="body-sm">
                Une erreur est survenue durant l'enregistrement de votre
                formation. Veuillez recommencer l'opération.
              </Typography>
            ),
          });
          stopLoading();
        }
      }
      stopLoading();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue, veuillez réessayer plus tard.
          </Typography>
        ),
      });
      setSelectedImage(null);
      stopLoading();
    }
  }

  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container className="flex flex-col gap-4 pb-4">
            <Container className="relative w-full h-[24rem] gap-4 flex flex-col justify-center items-center overflow-hidden z-10">
              <Container className="w-full h-full rounded overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src={preview ? preview : DefaultAvatar}
                  alt="User profile image"
                  className="h-full w-full object-cover "
                />
              </Container>
              <Container>
                <Container className="flex flex-col gap-4 lg:flex-row justify-between items-center">
                  <label
                    htmlFor="profil"
                    className="cursor-pointer text-gray-500 hover:text-primary-Default animate"
                  >
                    Selectionnez une photo de couverture pour votre formation{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profil"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Container>
              </Container>
            </Container>
          </Container>
          <Container className="flex flex-col gap-4">
            <Container>
              <Typography variant="title-sm" component="h4" className="mb-2">
                Branche de la formation <span className="text-red-500">*</span>
              </Typography>
              <InputFieldSelect
                control={form.control}
                name="category"
                options={options}
                placeholder="Selectionnez une branche pour votre formation"
              />
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography variant="title-sm" component="h4" className="mb-2">
                Nom de la formation <span className="text-red-500">*</span>
              </Typography>
              <InputField
                control={form.control}
                name="training_name"
                placeholder="Ajouter un nom à votre formation"
              />
            </Container>
            <Container className="flex flex-col gap-2">
              <Typography variant="title-sm" component="h4" className="mb-2">
                Description de la formation{' '}
                <span className="text-red-500">*</span>
              </Typography>
              <InputField
                control={form.control}
                name="training_description"
                placeholder="Ajouter une description à votre formation"
                type="textarea"
              />
            </Container>
            <Container>
              <Typography variant="title-sm" component="h4" className="mb-2">
                Chapitres <span className="text-red-500">*</span>
              </Typography>
            </Container>
            {fields.map((field, index) => {
              return (
                <Container className="flex flex-col gap-2" key={field.id}>
                  <Container className="w-full flex flex-row justify-between items-center">
                    <Typography
                      variant="title-sm"
                      component="h4"
                      className="mb-2"
                    >
                      Chapitre {index + 1}{' '}
                    </Typography>
                    {index > 0 && (
                      <Buttons
                        className="bg-red-500 hover:bg-red-600"
                        buttonType="action"
                        action={() => remove(index)}
                      >
                        Supprimer le chapitre
                      </Buttons>
                    )}
                  </Container>
                  <InputField
                    control={form.control}
                    name={`chapters.${index}.title` as const}
                    placeholder={`Ajouter un titre au chapitre ${index + 1}`}
                  />
                  <InputField
                    control={form.control}
                    name={`chapters.${index}.description` as const}
                    placeholder={`Ajouter une description au chapitre ${
                      index + 1
                    }`}
                    type="textarea"
                  />
                </Container>
              );
            })}
            <Buttons
              outline="outline"
              buttonType="action"
              action={() => append({ title: '', description: '' })}
            >
              Ajouter un chapitre
            </Buttons>
            <Container className="flex flex-col gap-2">
              <Typography variant="title-sm" component="h4" className="mb-2">
                Prix de la formation <span className="text-red-500">*</span>
              </Typography>
              <InputField
                control={form.control}
                name="price"
                placeholder="Ajouter le prix de votre formation"
                description={'Dévise en dollar ($)'}
                type="number"
              />
            </Container>
            <Buttons type="submit" isLoading={isLoading}>
              Créer la formation
            </Buttons>
          </Container>
        </form>
      </Form>
    </Container>
  );
};
