export interface AppLinks {
  title: string
  baseUrl?: string
  Icon?: React.ElementType
  action?: Function
  children?: {
    title?: string
    baseUrl?: string
    Icon?: React.ElementType
    action?: Function
    description?: string
    color?: string
    background?: string
  }[]
}