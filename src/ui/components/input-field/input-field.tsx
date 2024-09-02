import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Container } from '../container/container';
import clsx from 'clsx';
import { Typography } from '../typography/typography';

interface Props {
  control: any;
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  description?: string | React.ReactNode;
  type?: 'text' | 'email' | 'file' | 'password' | 'textarea' | 'number';
  autocompletion?: boolean;
  children?: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const InputField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  autocompletion = true,
  children,
  required = false,
  className,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? (
            required ? (
              <FormLabel>
                <Typography variant="title-sm" component="h4" className="">
                  {label} <span className="text-red-500">*</span>
                </Typography>
              </FormLabel>
            ) : (
              <FormLabel htmlFor={name}>
                <Typography variant="title-sm" component="h4" className="">
                  {label}
                </Typography>
              </FormLabel>
            )
          ) : null}
          <FormControl>
            <Container className="relative flex justify-center items-center">
              {type === 'textarea' ? (
                <Textarea
                  placeholder={placeholder}
                  className={clsx(
                    'resize-none rounded h-48 focus:ring-primary-Default border-secondary-300',
                    children ? 'pl-12' : '',
                    className
                  )}
                  {...field}
                />
              ) : type === 'file' ? (
                <Input
                  id={name}
                  placeholder={placeholder}
                  type="file"
                  className={clsx(
                    'rounded focus:ring-primary-Default border-secondary-300',
                    children ? 'pl-12' : '',
                    className
                  )}
                  {...field}
                  onChange={(event) => {
                    field.onChange(event.target?.files?.[0] ?? undefined);
                  }}
                  value={undefined}
                />
              ) : (
                <Input
                  className={clsx(
                    'rounded focus:ring-primary-Default border-secondary-300',
                    children ? 'pl-12' : '',
                    className
                  )}
                  placeholder={placeholder}
                  {...field}
                  type={type}
                  name={name}
                  id={name}
                  autoComplete={"'" + { autocompletion } + "'"}
                />
              )}
              {children ? children : null}
            </Container>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
