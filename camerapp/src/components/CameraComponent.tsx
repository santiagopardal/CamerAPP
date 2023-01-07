import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../models/Camera'
import './CameraComponent.css'

function CameraComponent(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    return (
        <div className='camera'>
            <h1>{camera.getName()}</h1>
            <div className='cameraBottom'>
                <p className='cameraBottomItem'>Is online</p>
                <a href={camera.getURL()} className='cameraBottomItem'>Go to camera</a>
            </div>
        </div>
    )
}

export default CameraComponent
