import { Dispatch, SetStateAction } from 'react'

export interface IPosition {
  x: number
  y: number
}

export const handleMouseMove = (
  e: MouseEvent,
  setMousePosition: Dispatch<SetStateAction<IPosition>>,
) => {
  setMousePosition({ x: e.clientX, y: e.clientY })
}

export const calculateTransform = (mousePosition: IPosition) => {
  const x = (mousePosition.x / window.innerWidth) * 2
  const y = (mousePosition.y / window.innerHeight) * 2

  return `translate(${x}%, ${y}%)`
}
