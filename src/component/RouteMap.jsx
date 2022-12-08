import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useGlobal } from '../context/useGlobal'
import getCenter from 'geolib/es/getCenter'
import PropTypes from 'prop-types'

function RouteMap ({ fullRouteStop }) {
  const global = useGlobal()

  const center = getCenter(fullRouteStop.map((itm) => {
    return ({ latitude: itm.lat, longitude: itm.long })
  }))

  return (
      <MapContainer style={{ height: '100%' }} center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
         fullRouteStop && fullRouteStop?.map((itm, idx) => {
           return (
                  <Marker key={`${idx}-${itm.stop}`} position={[itm?.lat, itm?.long]}>
                      <Popup>{itm[`name_tc`]}</Popup>
                  </Marker>
           )
         })
        }
      </MapContainer>
  )
}

RouteMap.propTypes = {
  fullRouteStop: PropTypes.array
}

export default React.memo(RouteMap)
