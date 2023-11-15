"use client"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Options } from "@/types/options"

interface Props {
  control: any,
  name: string,
  label: string,
  placeholder: string,
  description?: string,
  options: Options[]
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="rounded focus:ring-primary-Default">
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[40vh] overflow-auto rounded bg-white">
              {
                options.map(({id, title, children, label, Icon}) => 
                  label ?
                    <SelectItem key={id} value={label} className="focus:bg-primary-50">{label}</SelectItem>
                  :
                  <SelectGroup key={id}>
                    {
                      Icon ? <SelectLabel className="flex flex-row items-center"><Icon className='w-4 h-4 mr-2'/> {title}</SelectLabel> : <SelectLabel> {title}</SelectLabel>
                    }
                    {
                      children?.map(({id, label}) =>
                        <SelectItem key={id} value={label!} className="focus:bg-primary-50">{label}</SelectItem>
                      )
                    }
                  </SelectGroup>
                )
              }
            </SelectContent>
          </Select>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
