"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { OptionsTypes } from "@/types/options";
import { Image } from "lucide-react";

interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  options: OptionsTypes[];
  className?: any;
}

export const InputFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  options,
  className,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            name={name}
          >
            <FormControl>
              <SelectTrigger className="rounded focus:ring-primary-Default h-12">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[40vh] overflow-auto rounded bg-white">
              <SelectGroup>
                {options?.map(({ id, name, Icon }) => (
                  <SelectItem
                    key={id}
                    value={id!}
                    className="focus:bg-primary-50"
                  >
                    <div className="flex items-center w-full">
                      {Icon && <Icon className="w-4 h-4 mr-2" />} {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
