import React from 'react'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import getCameras from '../api/cameras'
import Camera from "../models/Camera"
import CameraComponent from "../components/CameraComponent"
import './Cameras.css'

function Cameras() {
    const [cameras, setCameras] = useState([])

    useEffect(() => {
        let cams: Promise<Camera[]> = getCameras()
        cams.then((cameras: Camera[]) => setCameras(cameras))
        cams.catch(() => redirect('/error'))
    }, []);

    let camerasComponents = cameras
        .sort((camera1: Camera, camera2: Camera) => camera1.getID() < camera2.getID() ? -1 : 1)
        .map((camera: Camera) => <CameraComponent key={camera.getID()} camera={camera}/>)
    return (
        <div className='cameras'>
            {camerasComponents}
        </div>
    )
}

export default Cameras
