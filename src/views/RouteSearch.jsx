import React, { useState, useEffect, useCallback } from 'react'
import Header from '../component/Header'
import { useGlobal } from '../context/useGlobal'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import API from '../api'
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'

function RouteSearch () {
  const global = useGlobal()
  const [route, setRoute] = useState('')
  const [dest, setDest] = useState('')
  const [routeList, setRoutList] = useState([])

  const displayList = routeList.filter((itm) =>
    itm.route.includes(route.toUpperCase()) && (itm.dest_tc.includes(dest) || itm.dest_sc.includes(dest) || itm.dest_en.replace(/\s/g, '').includes(dest)))

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const res = (await API.all_route_api()).data.data
      setRoutList(res)
    } catch (err) {
      console.log(err)
    }
  }

  const debRoute = useCallback(debounce((text) => { setRoute(text.toUpperCase()) }, 500), [])

  const debDest = useCallback(debounce((text) => { setDest(text.toUpperCase()) }, 500), [])

  const handleRouteChange = (e) => {
    debRoute(e.target.value)
  }

  const handleDestChange = (e) => {
    debDest(e.target.value)
  }

  const handleGoToTopBtn = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  return (
    <>
      <div className=" bg-white h-screen">
          <Header>
            <div className="routesearch-sticky">
              <div className="first-row">
                <div className="input-area">
                  <div>
                    Route :
                    <input type="text" onChange={(e) => { handleRouteChange(e) }} className="p-1 ml-2 text-black" placeholder="Route"/>
                  </div>
                  <div className="">
                    Destination :
                    <input type="text" onChange={(e) => { handleDestChange(e) }} className="p-1 ml-2  text-black" placeholder="Destination"/>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-6 items-center'>
                <div className="col-span-2 p-2">Route</div>
                <div className="p-2 text-start">Destination</div>
              </div>
            </div>
          </Header>
          <section className=''>
          {
            displayList?.length > 0
              ? displayList?.map((route, idx) => {
                return (
                <div key={`${route.route}-${idx}`} className={'route-search-row '}>
                  <Link to={`/detail?direction=${route.bound}&route=${route.route}&serviceType=${route.service_type}`}>
                    <div className={'p-2 grid grid-cols-6  hover:bg-red-300 '}>
                      <div className="option-grid-1">
                          <span className="option-route">{route.route}</span>
                      </div>
                      <div className="col-span-3">
                        <div className="text-sm md:text-base">
                            To
                            <span className="option-dest ">
                                {route[`dest_tc`]}
                            </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                )
              })
              : <div className={'text-black  px-3  py-4'}>
              <p className="text-center font-semibold">
              Please Select Bus Route
              </p>
            </div>
          }

          </section>
      </div>
      <ArrowUpCircleIcon onClick={() => handleGoToTopBtn()} className="TopBtn"/>

    </>
  )
}

export default RouteSearch
