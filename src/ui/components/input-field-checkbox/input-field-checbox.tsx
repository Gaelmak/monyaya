"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import clsx from "clsx"

interface Props {
  control: any,
  name: string,
  label: string | React.ReactNode,
  description? : string | React.ReactNode,
  items?: {
    id: string
    name: string
  }[]
}


export const InputFieldCheckbox = ({
  control,
  name,
  label,
  description,
  items,
}: Props) => {

  const BooleanCheckBox = (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full h-full flex flex-col rounded border p-4">
          <div className="w-full h-full flex flex-row items-start space-y-0 gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={clsx(
                  field.value? "bg-primary-Default border-none" : "",
                  "rounded text-white"
                  )}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {label}
              </FormLabel>
              <FormDescription>
                {description}
              </FormDescription>
            </div>
          </div>
          <FormMessage/>
        </FormItem>
      )}
    />
  )

  const MultipleCheckBox = (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div>
            <FormLabel>{label}</FormLabel>
            <FormDescription>
              {description}
            </FormDescription>
          </div>
          {items!.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name="items"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className=""
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id
                                )
                              )
                        }}
                      />
                    </FormControl>
                    <FormLabel>
                      {item.name}
                    </FormLabel>
                  </FormItem>
                )}
              }
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )

  return (
    <>
    { items ? MultipleCheckBox : BooleanCheckBox }
    </>
  )
}
