import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

function Header ({ children }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
      <>
        <div className='header dark:filter dark:grayscale'>
          <img src='https://www.kmb.hk/images/inc/kmb_icon.png'/>
        </div>
        <div>
            <ol className='grid grid-cols-2 text-center'>
              <li onClick={() => { navigate('/') }} className='header-option'>
                {t('Main')}
              </li>
              <li onClick={() => { navigate('/route') }} className='header-option'>
              {t('RouteSearch')}
              </li>
            </ol>
          </div>
        {children}
      </>

  )
}

Header.propTypes = {
  children: PropTypes.element.isRequired
}

export default Header
