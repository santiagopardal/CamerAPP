import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../models/Camera'
import './CameraComponent.css'

function CameraComponent(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    let connectedClass = `status ${camera.isOnline() ? 'connectedStatus' : 'disconnectedStatus'}`
    let connectedLabel = camera.isOnline() ? 'Online' : 'Offline'
    let linkClass = `cameraBottomItem${camera.isOnline() ? '' : ' disabled'}`
    return (
        <div className='camera'>
            <h1>{camera.getName()}</h1>
            <div className='cameraBottom rows'>
                <div className='rows'>
                    <span className={connectedClass}>●</span>
                    <p className='cameraBottomItem'>{connectedLabel}</p>
                </div>
                <a href={camera.getURL()} className={linkClass}>Go to camera</a>
            </div>
        </div>
    )
}

export default CameraComponent
