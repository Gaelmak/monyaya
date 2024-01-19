import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Container } from "../container/container"
import clsx from "clsx"

interface Props {
  control: any,
  name: string,
  label?: string,
  placeholder?: string,
  description? : string | React.ReactNode,
  type?: 
    'text'      | 
    'email'     |
    'file'      |
    'password',
  autocompletion? : boolean
  children? : React.ReactNode
}

export const InputField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  autocompletion = true,
  children
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {
            label ?
            <FormLabel>{label}</FormLabel>
            :
            null
          }
          <FormControl>
            <Container className="relative flex justify-center items-center">
              <Input 
                className={clsx(
                  "rounded focus:ring-primary-Default border-secondary-300",
                  children? "px-12" : "",
                  )}
                placeholder={placeholder} {...field} type={type} name={name} id={name} autoComplete={"'" + {autocompletion} +"'"}
                />
              {
                children?
                  children
                :
                null
              }
            </Container>
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}