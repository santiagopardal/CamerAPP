import React from 'react'
import { getCameras } from '../../api/Cameras'
import Camera from '../../models/Camera'
import SearchablePaginatableCards from '../../components/SearchablePaginatableCards'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Cameras.css'
import CameraCard from './components/CameraCard'

function Cameras() {
    return <SearchablePaginatableCards
        fetch={ (howMany: number, startingIndex: number) => getCameras() }
        getPropertyToCompare={ (camera: Camera) => camera.name }
        createCard={ (camera: Camera) => <CameraCard key={camera.id} camera={camera}/> }
    />
}

export default Cameras
