import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { GlobalProvider } from './context/useGlobal'
import Detail from './views/Detail'
import './i18n/i18n'
import RouteSearch from './views/RouteSearch'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="detail" element={<Detail/>}/>
            <Route path="route" element={<RouteSearch/>}/>
          </Routes>
        </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
)
