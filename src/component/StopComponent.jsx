import React from 'react'
import { useGlobal } from '../context/useGlobal'
import TimeHelper from '../utils/timehelper'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function StopComponent ({ stop, seq, fullRouteStop }) {
  const { t } = useTranslation()
  const global = useGlobal()
  const { lng } = global
  return (
    <div className="">
        {fullRouteStop &&
          <div className="font-semibold text-lg">
            {`${seq}.`}<span className="ml-2">{fullRouteStop[`name_${lng}`]}</span>
          </div>}
        {
            stop.fullroute.map((item, idx) => {
              const mintues = TimeHelper.getAbsMinuteDiff(item.eta, item.data_timestamp)
              return (
                        <div key={`${idx}-${item.route}`} className={'stop-div'}>
                            {
                                item.eta
                                  ? <div className={'stop-time mr-2 inline dark:text-white'}>
                                    {mintues < 1 ? '-' : mintues }
                                    <span className={'stop-time-word'}>{t('Minutes')}</span>
                                </div>
                                  : <div className="stop-time dark:text-white ">
                                    {t('NoBus')}
                                </div>
                            }
                            {
                                item[`rmk_${lng}`] &&
                                <span className="stop_remark ">
                                    { item[`rmk_${lng}`]}
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
