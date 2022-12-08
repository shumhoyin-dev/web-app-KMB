import React, { createContext, useMemo, useContext, useState } from 'react'
import API from '../api'
import PropTypes from 'prop-types'

const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [etaList, setEtaList] = useState(null)
  const [stop, setSelectedStop] = useState(JSON.parse(localStorage.getItem('seletcedStop')) || null)
  const [lng, setLng] = useState(() => localStorage.getItem('lng') || 'tc')

  const fetchDetailStopContext = async (info) => {
    try {
      // target stop info
      const dta = (await API.stop_api(info.id)).data.data
      localStorage.setItem('seletcedStop', JSON.stringify(dta))
      setSelectedStop(dta)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchETAContext = async (info) => {
    try {
      const routeStopInfo = (await API.stop_eta(info.id)).data.data
      const filteredRouteStopInfo = (routeStopInfo).filter((stop) => stop.eta_seq === 1)
      fetchDetailStopContext(info)
      setEtaList(filteredRouteStopInfo)
    } catch (err) {
      console.log(err)
    }
  }

  const refreshStatus = async () => {
    const routeStopInfo = (await API.stop_eta(stop.stop)).data.data
    const filteredRouteStopInfo = (routeStopInfo).filter((stop) => stop.eta_seq === 1)
    setEtaList(filteredRouteStopInfo)
  }


  const changeLngContext = (lng) => {
    localStorage.setItem('lng', lng)
    setLng(lng)
  }

  const value = useMemo(
    () => ({
      etaList,
      stop,
      fetchETAContext,
      fetchDetailStopContext,
      refreshStatus,
      lng,
      changeLngContext,
      setEtaList,
    }),
    [lng, etaList, stop]
  )
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export const useGlobal = () => {
  return useContext(GlobalContext)
}
