'use client'

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Link from "next/link"
import { Typography } from "../typography/typography"

interface Props {
  action?: Function
  baseUrl?: string
  variant? : 
    'primary'                  |
    'secondary'                |
    'accent'                   |
    'ghost'
  className?: string
  children: React.ReactNode
  disabled?: boolean
  buttonType?: 'link' | 'anchor' | 'action' | undefined
  outline?: 'outline' | 'default'
  width? : 'large' | 'regular' | 'small'
}

export const  Buttons = ({
  outline = 'default',
  disabled = false,
  width = 'regular',
  variant = 'primary',
  className,
  children,
  baseUrl,
  buttonType = undefined,
  action = () => {}
}: Props) => {

  let colorStyles: string = ''
  let txt_colorStyles: string = ''

  switch (variant) {
    case 'accent':
      colorStyles = 'bg-accent hover:bg-accent'
      txt_colorStyles = 'text-white'
      break;  
    case 'ghost':
      colorStyles = 'bg-white_powder hover:bg-white'
      txt_colorStyles = 'text-primary-Default'
  }

  if (!disabled) {
    if (outline === 'default') {
      switch (variant) {
        case "primary": //Default
          colorStyles = 'bg-primary-Default hover:bg-primary-600'
          txt_colorStyles = 'text-white'
          break;
        case "secondary":
          colorStyles = 'bg-secondary-Default hover:bg-secondary-600'
          txt_colorStyles = 'text-white'
          break;
      }
    } else {
      switch (variant) {
        case "primary":
          colorStyles = 'bg-white hover:text-primary-Default hover:bg-primary-50 border-primary-Default'
          txt_colorStyles = 'text-primary-Default'
          break;
        case "secondary":
          colorStyles = 'bg-white hover:text-secondary-Default hover:bg-secondary-50 border-secondary-Default'
          txt_colorStyles = 'text-secondary-Default'
          break;
      }
    }
  } else {
    if (outline === 'default') {
      switch (variant) {
        case "primary": //Default
          colorStyles = 'bg-primary-200'
          txt_colorStyles = 'text-primary-Default'
          break;
        case "secondary":
          colorStyles = 'bg-secondary-200'
          txt_colorStyles = 'text-secondary-Default'
          break;
      }
    } else {
      switch (variant) {
        case "primary":
          colorStyles = 'bg-white border-primary-300'
          txt_colorStyles = 'text-primary-300'
          break;
        case "secondary":
          colorStyles = 'bg-white border-secondary-300'
          txt_colorStyles = 'text-secondary-300'
          break;
      }
    }
  }

  const handleClick = async () => {
    if(action) {
      await action()
    }
  }
  
  const buttonLink = (
    <>
      <Button
        variant={outline}
        className={
          clsx(
            'rounded',
            colorStyles,
            txt_colorStyles,
            className
          )
        }
        disabled={disabled}
      >
        <Link href={baseUrl!}>
          {children}
        </Link>
      </Button>
    </>
  )

  const buttonAction = (
    <>
      <Button
        variant={outline}
        className={
          clsx(
            'rounded',
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </Button>
    </>
  )

  const buttonUndefined = (
    <>
      <Button
        variant={outline}
        className={
          clsx(
            'rounded',
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        disabled={disabled}
      >
        {children}
      </Button>
    </>
  )

  const buttonElement = (
    <>
      {
        buttonType === 'link' ?
          buttonLink
          : buttonType === 'action' ?
            buttonAction
            : buttonUndefined

      }
    </>
  )

  return (
    <>
      {buttonElement}
    </>
  )
}