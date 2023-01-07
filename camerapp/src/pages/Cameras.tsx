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
        const doFetchCameras = async () => {
            try {
                let cams: Camera[] = await getCameras()
                setCameras(cams)
            } catch (error) {
                console.log(error)
                redirect('/error')
            }
        }
        doFetchCameras()
    }, []);

    return cameras.map((camera: Camera) => <CameraComponent key={camera.getID()} camera={camera}/>)
}

export default Cameras
