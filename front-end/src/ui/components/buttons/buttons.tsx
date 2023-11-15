'use client'

import { Button as _Button } from "@/components/ui/button"
import clsx from "clsx"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface Props {
  action?: Function
  baseUrl?: string
  variant?: 
    'primary'                  |
    'secondary'                |
    'accent'                   |
    'ghost'
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  buttonType?: 'link' | 'anchor' | 'action' | undefined
  outline?: 'outline' | 'default'
  width?: 'lg' | 'default' | 'sm' | 'icon'
  Icon?: React.ElementType
  isloading?: boolean
}

export const  Buttons = ({
  action = () => {},
  baseUrl,
  buttonType = undefined,
  children,
  className,
  disabled = false,
  Icon,
  isloading = false,
  outline = 'default',
  variant = 'primary',
  width = 'default',
}: Props) => {

  let colorStyles: string = ''
  let txt_colorStyles: string = ''

  switch (variant) {
    case 'accent':
      colorStyles = 'bg-accent hover:bg-accent'
      txt_colorStyles = 'text-white'
      break;  
    case 'ghost':
      colorStyles = 'bg-gray-50 hover:bg-gray-100'
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
      <_Button
        variant={outline}
        className={
          clsx(
            children? "rounded" : "rounded-full",
            colorStyles,
            txt_colorStyles,
            className
          )
        }
        size={
          children ?
            width
            :
            'icon'
        }
        disabled= {isloading ? isloading : disabled}
        asChild
      >
        <Link href={baseUrl!}>
          {
            isloading ? 
            <Loader2 className= {children? "mr-2 h-5 w-5 animate-spin":"h-5 w-5 animate-spin"}/>
            :
              Icon ?
              <Icon className= {children? "mr-2 h-5 w-5":"h-5 w-5"}/>
              :
              null
          }
          {children}
        </Link>
      </_Button>
    </>
  )

  const buttonAction = (
    <>
      <_Button
        variant={outline}
        className={
          clsx(
            children? "rounded" : "rounded-full",
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        size={
          children ?
            width
            :
            'icon'
        }
        disabled= {isloading ? isloading : disabled}
        onClick={handleClick}
      >
        {
          isloading ? 
          <Loader2 className= {children? "mr-2 h-5 w-5 animate-spin":"h-5 w-5 animate-spin"}/>
          :
            Icon ?
            <Icon className= {children? "mr-2 h-5 w-5" : "h-5 w-5"}/>
            :
            null
        }
        {children}
      </_Button>
    </>
  )

  const buttonDefault = (
    <>
      <_Button
        variant={outline}
        className={
          clsx(
            children? "rounded" : "rounded-full",
            txt_colorStyles,
            colorStyles,
            className
          )
        }
        size={
          children ?
            width
            :
            'icon'
        }
        disabled= {isloading ? isloading : disabled}
      >
        {
          isloading ? 
          <Loader2 className= {children? "mr-2 h-5 w-5 animate-spin":"h-5 w-5 animate-spin"}/>
          :
            Icon ?
            <Icon className= {children? "mr-2 h-5 w-5":"h-5 w-5"}/>
            :
            null
        }
        {children}
      </_Button>
    </>
  )

  const buttonElement = (
    <>
      {
        buttonType === 'link' ?
          buttonLink
          : buttonType === 'action' ?
            buttonAction
            : buttonDefault

      }
    </>
  )

  return (
    <>
      {buttonElement}
    </>
  )
}