import React, { useState, useEffect } from 'react'
import Camera from '../models/Camera'
import { useLocation, useParams } from 'react-router-dom'
import { getCamera } from '../api/cameras'
import { useNavigate } from 'react-router-dom'

function SingleCamera() {
    const [camera, setCamera] = useState(null)
    let { id } = useParams()
    let location = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        return () => {
            if (location && location.state && location.state.camera) {
                let newCamera: Camera = new Camera(location.state.camera)
                setCamera(newCamera)
            } else {
                let camera = getCamera(id)
                camera.then(camera => setCamera(camera))
                camera.catch((error) => {console.log(error); navigate('/error')})
            }
        };
    }, []);

    return (
        <div>
            {camera && <h1>{ camera.getName() }</h1>}
        </div>
    )
}

export default SingleCamera
