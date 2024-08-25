'use client'

import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { SearchFormFieldsType } from "@/types/forms"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { InputField } from "@/ui/components/input-field/input-field"
import { Search } from "lucide-react"

export const SearchCourses = () => {

  const form = useForm<z.infer<typeof SearchFormFieldsType>>({
    resolver: zodResolver(SearchFormFieldsType),
    defaultValues: {
      formation_or_name: ''
    },
  })
 
  async function onSubmit(values: z.infer<typeof SearchFormFieldsType>) {
    const {} = values
  }
  
  return(
    <Container className="w-full md:w-[80%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">
        <Container className='grid grid-cols-2 md:flex md:flex-row gap-2 md:justify-between md:items-end'>
          <Container className="col-span-2 md:basis-5/6">
            <InputField
              control={form.control}
              name="formation_or_name"
              placeholder="Recherchez une formation ou un formateur"
            />
          </Container>
          <Container className="col-span-2 md:w-auto flex flex-row gap-4">
            <Buttons Icon={Search} variant="primary" className="mb-2 w-full">Rechercher</Buttons>
          </Container>
        </Container>
        </form>
      </Form>
    </Container>
  )
}