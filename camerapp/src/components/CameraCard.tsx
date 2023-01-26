import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../models/Camera'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './CameraCard.css'
import { useNavigate } from 'react-router-dom'
import { getSnapshotUrl } from '../api/Cameras'
import useCameraConfigs from '../hooks/useCameraConfigs'

function CameraCard(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    let [setIsRecording, isRecording, isOnline] = useCameraConfigs(camera)
    let connectedClass = `status ${isOnline ? 'connectedStatus' : 'disconnectedStatus'}`
    let connectedLabel = isOnline ? 'Online' : 'Offline'
    let navigate = useNavigate()

    const openCamera = () => {
        navigate(`/cameras/${camera.getID()}`, {state:{camera: camera}})
    }

    return (
        <Card className='camera' onClick={ openCamera }>
            {isOnline && <Card.Img variant="top" src={ getSnapshotUrl(camera) }/>}
            <Card.Body>
                <Card.Title>{ camera.getName() }</Card.Title>
                <Card.Text>
                    <span className={ connectedClass }>●</span>
                    <span className='cameraBottomItem'>{ connectedLabel }</span>
                </Card.Text>
                <Button className='button' variant="primary" href={ camera.getURL() }>Go to camera</Button>
            </Card.Body>
        </Card>
    )
}

export default CameraCard
