'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import clsx from "clsx";
import { useState } from "react";

export const Filter = () => {
  const branch = [{name: "Tous"}, {name: "Anglais"}, {name: "Français"}, {name: "Guitare"}, {name: "Piano"}, {name: "Coach sportif"}]
  const [filter, setFilter] = useState("Tous")
  return (
    <Container className="flex flex-wrap gap-4">
      {
        branch.map((item) => (
          <div 
            onClick={() => setFilter(item.name)}
            key={item.name}
            className={clsx("inline-block cursor-pointer p-4 rounded animate hover:bg-primary-Default hover:text-white", filter === item.name? "bg-primary-Default text-white" : "bg-primary-100")}
          >
            <Typography>{item.name}</Typography>
          </div>
        ))
      }
    </Container>
  )
}