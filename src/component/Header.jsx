import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function Header ({ children }) {
  const navigate = useNavigate()
  return (
      <>
        <div className='header'>
          <img src='https://www.kmb.hk/images/inc/kmb_icon.png'/>
        </div>
        <div>
            <ol className='grid grid-cols-2 text-center'>
              <li onClick={() => { navigate('/') }} className='header-option'>
                Main
              </li>
              <li onClick={() => { navigate('/route') }} className='header-option'>
                Route Search
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
