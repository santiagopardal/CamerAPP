import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Cameras from "./pages/Cameras";

function CamerAIRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/cameras" element={ <Cameras/> }/>
        </Routes>
    )
}

export default CamerAIRoutes;