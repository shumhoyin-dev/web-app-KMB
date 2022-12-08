
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGlobal } from '../context/useGlobal'
import { useTranslation } from 'react-i18next'
import Header from '../component/Header'
import StopComponent from '../component/StopComponent'
import RouteMap from '../component/RouteMap'
import API from '../api'

function Detail () {
  const { t } = useTranslation()
  const global = useGlobal()
  const { lng } = global

  const [routeInfo, setRouteInfo] = useState(null)
  const [fullRoute, setFullRoute] = useState(null)
  const [fullRouteStop, setFullRouteStop] = useState(null)

  const [searchParams] = useSearchParams()
  const direction = searchParams.get('direction')
  const route = searchParams.get('route')
  const serviceType = searchParams.get('serviceType')

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      // route API
      const routeDetail = (await API.route_api(route, direction, serviceType)).data.data

      // Route-Stop API
      const routeStop = (await API.routeStop_api(route, direction, serviceType)).data.data

      // Route ETA
      const routeETA = (await API.routeETA_api(route, serviceType)).data.data

      // data refactor
      for (let i = 0; i < routeStop.length; i++) {
        const filtered = routeETA.filter((itm) => {
          return (itm.dir === routeStop[i].bound && itm.seq.toString() === routeStop[i].seq)
        })
        routeStop[i].fullroute = filtered
      }

      // get each stop info
      const RouteStopInfo = await Promise.all(routeStop.map(async (itm) => {
        return (await API.stop_api(itm.stop)).data.data
      }))

      setFullRouteStop(RouteStopInfo)
      setFullRoute(routeStop)
      setRouteInfo(routeDetail)
    } catch (err) {
      console.log(err)
    }
  }

  return (
        <div className={'h-screen '}>
            <Header/>
            <div className="detail-content-container">
                <div className="map-container">
                {
                    fullRouteStop && <RouteMap fullRouteStop={fullRouteStop} />
                }
                </div>
                <div className={'list-container'}>
                    <div className="route-eta-head">
                        <p className='space-x-2'>
                            {
                                routeInfo &&
                                <>
                                    <span className="mr-1">{routeInfo.route}</span>
                                    {t('To')}
                                    <span>{routeInfo[`dest_${lng}`]}</span>
                                </>
                            }
                        </p>
                    </div>
                    <div className={'time-container'}>
                        {
                            fullRouteStop && fullRoute && fullRoute?.map((itm, idx) => {
                              return (
                                    <StopComponent key={`${idx}-${itm.route}`} seq={itm.seq} stop={itm} fullRouteStop={fullRouteStop[idx]}/>
                              )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>

  )
}

export default Detail
