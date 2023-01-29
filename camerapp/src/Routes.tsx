import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Cameras from './pages/Cameras/Cameras'
import SingleCamera from './pages/SingleCamera/SingleCamera'
import Error from './pages/Error/Error'
import Nodes from './pages/Nodes/Nodes'
import SingleNode from './pages/SingleNode/SingleNode'

function CamerAIRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/cameras" element={ <Cameras/> }/>
            <Route path="/cameras/:id" element={ <SingleCamera/> }/>
            <Route path='/nodes' element={<Nodes/>}/>
            <Route path='/nodes/:id' element={<SingleNode/>}/>
            <Route path="/error" element={ <Error/> }/>
        </Routes>
    )
}

export default CamerAIRoutes;