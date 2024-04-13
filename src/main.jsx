import React from 'react'
import ReactDOM from 'react-dom/client'
import Viewport from './Viewport.jsx'
import LeftPanel from './LeftPanel.jsx'
import RightPanel from './RightPanel.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='relative'>
      <div className='fixed w-screen h-screen'>
        <Viewport/>
      </div>
      <LeftPanel/>
      <RightPanel/>
    </div>
  </React.StrictMode>,
)
