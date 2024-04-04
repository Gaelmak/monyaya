"use client"

import { Buttons } from "@/ui/components/buttons/buttons"
import { Typography } from "@/ui/components/typography/typography"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Training = {
  id: string
  name: string
  price: number
  createdAt: Date
  _count: {
    modules: number
    learners: number
  }
  courses: {
    name: string
  }
}

export const columns: ColumnDef<Training>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Buttons
          variant="ghost"
          buttonType="action"
          action={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-white text-black"
        >
          <Typography variant="title-sm" component="h4">
            Date
          </Typography>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Buttons>
      )
    },
    cell: ({row}) => {
      const date : Date = row.getValue("createdAt")
      const day = date.getDate().toString().padStart(2, '0'); // Obtient le jour et le met au format "jj"
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtient le mois (attention : janvier est 0) et le met au format "mm"
      const year = date.getFullYear(); // Obtient l'année au format "aaaa"
      return `${day}-${month}-${year}`;
    }
  },
  {
    accessorKey: "courses.name",
    header: "Branche",
  },
  {
    accessorKey: "price",
    header: "Prix",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div className="text-left rounded text-white bg-secondary-600 p-2">{formatted}</div>
    },
  },
  {
    accessorKey: "_count.modules",
    header: "Modules",
  },
  {
    accessorKey: "_count.learners",
    header: "Apprenants",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const training = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white rounded">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/trainings/training/${training.id}`}>
                Voir les apprenants
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Modifier la formation</DropdownMenuItem>
            <DropdownMenuItem>Supprimer la formation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      )
    },
  },
]
