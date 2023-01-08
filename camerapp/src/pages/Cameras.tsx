import React from 'react'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import getCameras from '../api/cameras'
import Camera from "../models/Camera"
import CameraComponent from "../components/CameraComponent"
import Form from 'react-bootstrap/Form';
import './Cameras.css'

function Cameras() {
    const [allCameras, setAllCameras] = useState([])
    const [camerasToDisplay, setCamerasToDisplay] = useState([])

    const newSearchText = (searcher) => {
        let searchedText = searcher ? searcher.target.value : null
        let camerasToDisplay = allCameras.slice();
        if (searchedText) {
            camerasToDisplay = camerasToDisplay.filter(
                (camera: Camera) => camera.getName().toLowerCase().includes(searchedText.toLowerCase())
            )
        }
        setCamerasToDisplay(camerasToDisplay)
    }

    useEffect(() => {
        let cams: Promise<Camera[]> = getCameras()
        cams.then(
            (cameras: Camera[]) => {
                setAllCameras(cameras)
                setCamerasToDisplay(cameras)
            }
        )
        cams.catch(() => redirect('/error'))
    }, []);

    let camerasComponents = camerasToDisplay
        .sort((camera1: Camera, camera2: Camera) => camera1.getID() < camera2.getID() ? -1 : 1)
        .map((camera: Camera) => <CameraComponent key={camera.getID()} camera={camera}/>)

    return (
        <div className='cameras'>
            <Form.Control type="search" placeholder="Search" aria-label="Search" onChange={newSearchText}></Form.Control>
            {camerasComponents}
        </div>
    )
}

export default Cameras
