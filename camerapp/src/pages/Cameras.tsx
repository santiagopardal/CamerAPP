import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getCameras } from '../api/Cameras'
import Camera from '../models/Camera'
import CameraCard from '../components/CameraCard'
import PaginatableCards from '../components/PaginatableCards'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Cameras.css'

function Cameras() {
    let navigate = useNavigate()
    const [allCameras, setAllCameras] = useState<Camera[]>([])
    const [camerasToDisplay, setCamerasToDisplay] = useState<Camera[]>([])

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
        cams.catch(() => navigate('/error'))
    }, []);

    let camerasComponents = camerasToDisplay
        .sort((camera1: Camera, camera2: Camera) => camera1.getID() < camera2.getID() ? -1 : 1)
        .map((camera: Camera) => <CameraCard key={camera.getID()} camera={camera}/>)

    return (
        <>
            <div className='actions'>
                <Form.Control type='search' placeholder='Search' aria-label='Search' onChange={newSearchText}></Form.Control>
                <Button variant='dark' size='sm'>Add new camera</Button>
            </div>
            <PaginatableCards
                fetch={ getCameras }
                paginationSize={10}
                createCard={(camera: Camera) => <CameraCard key={camera.getID()} camera={camera}/>}
            />
        </>
    )
}

export default Cameras
