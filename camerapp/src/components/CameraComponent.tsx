import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../models/Camera'

function CameraComponent(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    return (
        <>
            <h1>{camera.getName()}</h1>
            <a href={camera.getURL()}>Go to camera</a>
        </>
    )
}

export default CameraComponent
