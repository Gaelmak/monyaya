'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { CourseSearchFormFieldsType } from '@/types/forms';
import { Buttons } from '@/ui/components/buttons/buttons';
import { Container } from '@/ui/components/container/container';
import { InputFieldSelect } from '@/ui/components/input-field-select/input-field-select';
import { InputField } from '@/ui/components/input-field/input-field';
import { Filter } from 'lucide-react';
import { Options } from '@/types/options';

interface Props {
  CourseList: Options[];
}

export const FilterCourses = ({ CourseList }: Props) => {
  const form = useForm<z.infer<typeof CourseSearchFormFieldsType>>({
    resolver: zodResolver(CourseSearchFormFieldsType),
    defaultValues: {
      course: '',
      budget: '',
      formation_or_name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof CourseSearchFormFieldsType>) {
    const {} = values;
  }

  return (
    <Container className="p-4 border-[1px] drop-shadow-md border-gray-100 rounded bg-[#fdfdfd]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 md:space-y-4"
        >
          <Container className="grid grid-cols-2 md:flex md:flex-row gap-2 md:justify-between md:items-end">
            <Container className="md:basis-1/5">
              <InputFieldSelect
                control={form.control}
                name="course"
                placeholder="Formations"
                options={CourseList}
                description={''}
              />
            </Container>
            <Container className="col-span-2 md:basis-2/5">
              <InputField
                control={form.control}
                name="formation_or_name"
                placeholder="Recherchez une formation ou un formateur"
              />
            </Container>
            <Container className="col-span-2 md:basis-1/5 flex flex-row gap-4">
              <Buttons Icon={Filter} variant="accent" className="mb-2 w-full">
                Filtrer
              </Buttons>
            </Container>
          </Container>
        </form>
      </Form>
    </Container>
  );
};
