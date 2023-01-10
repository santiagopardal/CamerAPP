import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../models/Camera'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CameraCard.css'
import { useNavigate } from "react-router-dom";

function CameraCard(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    let connectedClass = `status ${camera.isOnline() ? 'connectedStatus' : 'disconnectedStatus'}`
    let connectedLabel = camera.isOnline() ? 'Online' : 'Offline'
    let navigate = useNavigate()

    const openCamera = () => {
        navigate(`/cameras/${camera.getID()}`, {state:{camera: camera}})
    }

    return (
        <Card className='camera' onClick={ openCamera }>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{ camera.getName() }</Card.Title>
                <Card.Text>
                    <div className='rows'>
                        <span className={ connectedClass }>●</span>
                        <p className='cameraBottomItem'>{ connectedLabel }</p>
                    </div>
                </Card.Text>
                <Button variant="primary" href={ camera.getURL() }>Go to camera</Button>
            </Card.Body>
        </Card>
    )
}

export default CameraCard
