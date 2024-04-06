'use client'

import React, { useMemo, useState } from 'react'
import { Tcoordinate } from '@shared/types'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import Pin from './components/Pin'
import { useCoordinates } from '@shared/hooks/useCoordinates'
import { isCoordinateInProximity } from '../ReaderUtils'
import { Text } from '@shared/components'

type TReaderMap = {
  coordinates: Tcoordinate[]
  seeReader: (email: string) => void
}

const proximityThresholdInMeters = 10000
const accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESSTOKEN ?? ''
const randomRotate = Math.random() * 45

function ReaderMap({ coordinates, seeReader }: TReaderMap) {
  const { latitude, longitude } = useCoordinates()
  const [popupInfo, setPopupInfo] = useState<Tcoordinate | null>(null)

  const pins = useMemo(
    () =>
      coordinates.map((user, index) => {
        const isClose = isCoordinateInProximity(
          { lat: user.lat, lng: user.lng },
          coordinates,
          proximityThresholdInMeters,
        )

        return (
          <Marker
            key={`marker-${index}`}
            longitude={user.lng}
            latitude={user.lat}
            rotation={isClose ? randomRotate : 0}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              seeReader(user.email)
              setPopupInfo(user)
            }}
          >
            <Pin />
          </Marker>
        )
      }),
    [coordinates, seeReader],
  )

  return (
    <>
      <Map
        initialViewState={{
          latitude,
          longitude,
          zoom: 4,
          bearing: 0,
          pitch: 45,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={accessToken}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {coordinates.length > 0 && pins}

        {popupInfo && (
          <Popup
            anchor="top"
            closeButton={false}
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <Text as="small" text={popupInfo.name} color="gray" weight="bold" />
          </Popup>
        )}
      </Map>
    </>
  )
}

export default ReaderMap
