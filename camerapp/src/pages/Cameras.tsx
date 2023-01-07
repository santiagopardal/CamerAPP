import React from 'react'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import getCameras from '../api/cameras'
import Camera from "../models/Camera"
import CameraComponent from "../components/CameraComponent"

function Cameras() {
    const [cameras, setCameras] = useState([])

    useEffect(() => {
        let cams: Promise<Camera[]> = getCameras()
        cams.then((cameras: Camera[]) => setCameras(cameras))
        cams.catch(() => redirect('/error'))
    }, []);

    return cameras.map((camera: Camera) => <CameraComponent key={camera.getID()} camera={camera}/>)
}

export default Cameras
