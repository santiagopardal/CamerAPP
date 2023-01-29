import React from 'react'
import CamerAIRoutes from './Routes'
import CamerAINavBar from './components/CamerAINavBar'
import './App.css'

function App() {
    return (
        <>
            <CamerAINavBar/>
            <div className='main-content'>
                <CamerAIRoutes/>
            </div>
        </>
    )
}

export default App
