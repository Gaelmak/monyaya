import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface Props {
  control: any,
  name: string,
  label: string,
  placeholder: string,
  description? : string,
  type?: 
    'text'      | 
    'email'     |
    'file'      |
    'password'  
}

export const InputField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text'
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="rounded focus:ring-primary-Default" placeholder={placeholder} {...field} type={type}/>
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