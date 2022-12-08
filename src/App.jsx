import React from 'react'
import './App.css'
import { createSearchParams, useNavigate } from 'react-router-dom'
import PullToRefresh from 'react-simple-pull-to-refresh'
import TimeHelper from './utils/timehelper'
import { useGlobal } from './context/useGlobal'
import Header from './component/Header'
import { BUS_STOP_LOCATION } from './constant/bustop'

function App () {

  const navigate = useNavigate()
  const global = useGlobal()

  const {
    etaList,
    stop,
    fetchETAContext,
    refreshStatus,
  } = global

  const handleRefresh = async () => refreshStatus()

  const navigation = (pathname, info) => {
    navigate({
      pathname,
      search: `?${createSearchParams({
        direction: info.dir,
        route: info.route,
        serviceType: info.service_type
      }).toString()}`
    })
  }

  return (
    <div className={' bg-white'}>
      <Header>
        <div className="stickyheader">
          <div className='option-container'>
            <div className='defaultbtn-container'>
              {
                BUS_STOP_LOCATION.map(location=>(
                  <button className="defaultbtn"
                    onClick={() => { fetchETAContext({ stopname: location.stopName, id: location.id }) }}>
                      {location.stopName}
                  </button>
                ))
              }
            </div>
          </div>
          <div className='grid-header'>
            <div className="col-span-2 p-2">Route</div>
            <div className="col-span-3">Dest</div>
            <div className="">Time</div>
          </div>
        </div>
      </Header>

      {
        etaList &&
        <PullToRefresh className="" pullingContent={false} onRefresh={handleRefresh}>
        {
          etaList?.map((itm, idx) => {
            const mintues = TimeHelper.getAbsMinuteDiff(itm?.eta, itm.data_timestamp) ?? '-'
            return (
              <div key={`${idx}-${itm.route}`} onClick={() => { navigation('detail', itm) }} className={'option-row'}>
                <div className={'option-grid'}>
                  <div className="option-grid-1">
                      <span className="option-route">{itm.route}</span>
                  </div>
                  <div className="col-span-3">
                      <div className="text-sm md:text-base">
                          To
                          <span className="option-dest ">
                              {itm[`dest_tc`]}
                          </span>
                          <p className="text-sm md:text-base">
                              {stop && stop[`name_tc`]}
                          </p>
                      </div>
                  </div>
                  <div className="option-grid-3">
                      <div className={'option-min-block'}>
                          <p>{mintues < 1 ? '-' : mintues }</p>
                          <span className={'text-sm md:text-lg '}>Minutes</span>
                      </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        </PullToRefresh>
      }
    </div>
  )
}

export default App
