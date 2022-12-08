import React from 'react'
import { useGlobal } from '../context/useGlobal'
import { useTranslation } from 'react-i18next'

function LangChooser () {
  const { i18n } = useTranslation()
  const global = useGlobal()

  const {
    changeLngContext,
    toggleDarkMode,
    isDark
  } = global

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    changeLngContext(lang)
  }

  return (
    <div className="langchooser-container">
        <div className="cursor-pointer" onClick={() => { toggleDarkMode() }}>{ isDark ? 'LIGHT' : 'DARK' }</div>
        <div className="cursor-pointer" onClick={() => { changeLang('en') }}>EN</div>
        <div className="cursor-pointer" onClick={() => { changeLang('tc') }}>TC</div>
        <div className="cursor-pointer" onClick={() => { changeLang('sc') }}>SC</div>
    </div>
  )
}

export default LangChooser
