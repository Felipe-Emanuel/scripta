import { useEffect, useState } from 'react'

/**
 *
 * @param errorResolver callback error resolver
 * @returns companie longitude and latitude
 */

export const useCoordinates = (errorResolver?: () => void) => {
  const [coordinates, setCoordinates] = useState({
    latitude: -23.5489,
    longitude: -46.6388
  })

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        error.message === 'User denied Geolocation' && errorResolver?.()
      },
      options
    )
  }, [errorResolver])

  return { ...coordinates }
}
