import React from "react"

export interface Options {
  id: string | number
  label?: string
  Icon?: React.ElementType
  title?: string
  children?: {
    id?: string | number
    label?: string
    Icon?: React.ElementType
  }[]
}