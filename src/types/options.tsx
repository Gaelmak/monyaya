import React from "react"

export interface Options {
  id: string 
  Icon?: React.ElementType
  name?: string
  courses?: {
    id?: string
    name?: string
    Icon?: React.ElementType
  }[]
}