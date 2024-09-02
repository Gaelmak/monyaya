'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Options } from '@/types/options';

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  options: Options[];
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            name={name}
          >
            <FormControl>
              <SelectTrigger className="rounded focus:ring-primary-Default">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[40vh] overflow-auto rounded bg-white">
              {options.map(({ id, courses, name, Icon }) =>
                !courses ? (
                  <SelectItem
                    key={id}
                    value={id!}
                    className="focus:bg-primary-50"
                  >
                    {name}
                  </SelectItem>
                ) : (
                  <SelectGroup key={id}>
                    {Icon ? (
                      <SelectLabel className="flex flex-row items-center">
                        <Icon className="w-4 h-4 mr-2" /> {name}
                      </SelectLabel>
                    ) : (
                      <SelectLabel> {name}</SelectLabel>
                    )}
                    {courses?.map(({ id, name }) => (
                      <SelectItem
                        key={id}
                        value={id!}
                        className="focus:bg-primary-50"
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              )}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
