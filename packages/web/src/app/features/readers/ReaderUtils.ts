import { z } from 'zod'

interface Coordinate {
  lat: number
  lng: number
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

const calculateDistance = (coord1: Coordinate, coord2: Coordinate) => {
  const R = 6371e3
  const φ1 = toRadians(coord1.lat)
  const φ2 = toRadians(coord2.lat)
  const Δφ = φ2 - φ1
  const Δλ = toRadians(coord2.lng - coord1.lng)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(toRadians(φ1)) *
      Math.cos(toRadians(φ2)) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export const isCoordinateInProximity = (
  targetCoordinate: Coordinate,
  coordinates: Coordinate[],
  proximityThreshold: number,
) => {
  for (const coordinate of coordinates) {
    if (
      coordinate.lat === targetCoordinate.lat &&
      coordinate.lng === targetCoordinate.lng
    ) {
      continue
    }

    const distance = calculateDistance(targetCoordinate, coordinate)
    if (distance <= proximityThreshold) {
      return true
    }
  }
  return false
}

export const searchBookSchema = z.object({
  bookTitle: z.string(),
})

export type TSearchBookSchema = z.infer<typeof searchBookSchema>
