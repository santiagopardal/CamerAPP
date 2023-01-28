import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Cameras from './pages/Cameras'
import SingleCamera from './pages/SingleCamera'
import Error from './pages/Error'
import Nodes from './pages/Nodes'

function CamerAIRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/cameras" element={ <Cameras/> }/>
            <Route path="/cameras/:id" element={ <SingleCamera/> }/>
            <Route path='/nodes' element={<Nodes/>}/>
            <Route path="/error" element={ <Error/> }/>
        </Routes>
    )
}

export default CamerAIRoutes;