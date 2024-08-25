import { Container } from "../container/container"
import {
  Star, StarHalf
} from 'lucide-react'

interface Props {
  rate: number
  color?: string
  size?: number
}

export const Stars = ({
  rate,
  color = 'white',
  size = 14
}: Props) => {
  
  let repeat: number = 0
  let half : boolean = false
  let rest : number = 0

  repeat = Math.floor(rate / 1)

  if(rate % 1 === 0) {
    half = false
    rest = 5 - repeat
  } else {
    half = true
    rest = 4 - repeat
  }

  return(
    <Container className="flex gap-1">
      {
        [...Array(repeat)].map((_, i) => (
          <Star color={color} size={size} key={i}/>
        ))
      }
      {
        half ?
          <Container className="flex gap-0">
            <StarHalf color={color} size={size} />
            <StarHalf color="#f5f5f5" size={size} className="scale-x-[-1] absolute"/>
          </Container>
        :
          null
      }
      {
        [...Array(rest)].map((_, i) => (
          <Star color="#f5f5f5" size={size} key={i}/>
        ))
      }
      
    </Container>
  )
}