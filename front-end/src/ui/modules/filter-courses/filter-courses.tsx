'use client'

import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { CourseSearchFormFieldsType } from "@/types/forms"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { InputFieldSelect } from '@/ui/components/input-field-select/input-field-select'
import { CourseList } from "@/lib/course-list/course-list"
import { InputField } from "@/ui/components/input-field/input-field"
import { PriceCategory } from "@/lib/price-category/price-category"
import { Filter } from "lucide-react"

export const FilterCourses = () => {

  const form = useForm<z.infer<typeof CourseSearchFormFieldsType>>({
    resolver: zodResolver(CourseSearchFormFieldsType),
    defaultValues: {
      course: '',
      budget: '',
      name: ''
    },
  })
 
  async function onSubmit(values: z.infer<typeof CourseSearchFormFieldsType>) {
    const {} = values
  }
  
  return(
    <Container className="p-6 border-[1px] border-gray-100 rounded bg-[#fdfdfd]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Container className='grid grid-cols-2 md:flex md:flex-row gap-4 md:justify-between md:items-end'>
          <Container className="md:basis-1/5">
            <InputFieldSelect
              control={form.control}
              name='course'
              label="Formation"
              placeholder="Formations"
              options={CourseList} 
              description={''}
            />
          </Container>
          <Container className="md:basis-1/5">
            <InputFieldSelect
              control={form.control}
              name='budget'
              label="Budget"
              placeholder="Budget"
              options={PriceCategory} 
              description={''}
            />
          </Container>
          <Container className="col-span-2 md:basis-2/5">
            <InputField
              control={form.control}
              name="name"
              label="Nom"
              placeholder="Recherchez un formateur par son nom"
            />
          </Container>
          <Container className="col-span-2 md:basis-1/5 flex flex-row gap-4">
            <Buttons Icon={Filter} className="mb-2">Filtrer</Buttons>
            <Buttons variant="secondary" className="mb-2">Tout voir</Buttons>
          </Container>
        </Container>
        </form>
      </Form>
    </Container>
  )
}