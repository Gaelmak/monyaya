import { clsx } from "clsx"

interface Props {
  color?: 'destructive' | 'black' | 'white' | 'secondary' | 'primary' | 'accent'
  children: React.ReactNode
  className?: string
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'
  variant: 
    'title-lg'    | 
    'title-base'  | 
    'title-sm'    | 
    'title-xs'    | 
    'body-lg'     | 
    'body-base'   | 
    'body-sm'     
}

export const Typography = ({
  variant = 'body-base',
  color = 'black',
  children, 
  className,
  component : Component  = 'p'
}: Props) => {

  let variantStyles: string = ''
  let colorStyles: string = ''
  


  switch (color) {
    case "black": // Default
      colorStyles = 'text-black'
      break;
    case "primary":
      colorStyles = 'text-primary-Default'
      break;
    case "secondary":
      colorStyles = 'text-secondary-Default'
      break;
    case "white":
      colorStyles = 'text-white'
      break;
    case "accent":
      colorStyles = 'text-accent'
      break;
    case "destructive":
      colorStyles = 'text-destructive'
      break;
  }

  switch (variant) {
    case "title-lg":
      variantStyles = 'text-title-lg'
      break;
    case "title-base":
      variantStyles = 'text-title-base'
      break;
    case "title-sm":
      variantStyles = 'text-title-sm'
      break;
    case "title-xs":
      variantStyles = 'text-title-xs'
      break;
    case "body-lg":
      variantStyles = 'text-body-lg'
      break;
    case "body-base": // Default
      variantStyles = 'text-body-base'
      break;
    case "body-sm":
      variantStyles = 'text-body-sm'
      break;
  }

  return (
    <Component 
      className={
        clsx(
          variantStyles,
          colorStyles,
          className
        )
      }
    >
      {children}
    </Component>
  )
}