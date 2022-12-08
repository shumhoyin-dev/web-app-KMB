import React from 'react'
import { useGlobal } from '../context/useGlobal'
import TimeHelper from '../utils/timehelper'
import PropTypes from 'prop-types'

function StopComponent ({ stop, seq, fullRouteStop }) {
  const global = useGlobal()
  return (
    <div className="">
        {fullRouteStop &&
          <div className="font-semibold text-lg">
            {`${seq}.`}<span className="ml-2">{fullRouteStop[`name_tc`]}</span>
          </div>}
        {
            stop.fullroute.map((item, idx) => {
              const mintues = TimeHelper.getAbsMinuteDiff(item.eta, item.data_timestamp)
              return (
                        <div key={`${idx}-${item.route}`} className={'stop-div'}>
                            {
                                item.eta
                                  ? <div className={'stop-time mr-2 inline '}>
                                    {mintues < 1 ? '-' : mintues }
                                    <span className={'stop-time-word'}>Minutes</span>
                                </div>
                                  : <div className="stop-time  ">
                                    No Scheduled Bus Available
                                </div>
                            }
                            {
                                item[`rmk_tc`] &&
                                <span className="stop_remark ">
                                    { item[`rmk_tc`]}
                                </span>

                            }
                        </div>
              )
            })
        }
    </div>
  )
}

StopComponent.propTypes = {
  stop: PropTypes.object,
  seq: PropTypes.number,
  fullRouteStop: PropTypes.object
}

export default StopComponent
