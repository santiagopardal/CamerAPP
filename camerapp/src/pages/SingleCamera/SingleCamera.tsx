import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCamera } from '../../api/Cameras'
import { getSnapshot } from '../../api/Cameras'
import CameraConfigs from './components/CameraConfigs'
import CameraVideos from './components/CameraVideos'
import './SingleCamera.css'
import Camera from '../../models/Camera'

function SingleCamera() {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [camera, setCamera] = useState<Camera>()
    const [imageUrl, setImageUrl] = useState<string>(getSnapshot(parseInt(id || '1')))

    useEffect(() => {
        let cameraId = parseInt(id || '1')

        if (location.state && location.state.camera)
            setCamera(new Camera(location.state.camera))
        else
            getCamera(cameraId)
                .then(setCamera)
                .catch(() => navigate('/error'))
    }, []);

    // FIXME: This is not right, what I really need is a websocket to transmit in real time.
    // useEffect(() => {
    //     if (camera != null) {
    //         setImageUrl(getSnapshot(camera.id) + "?timestamp=" + new Date().getTime())
    //     }
    //
    //     const interval = setInterval(
    //         async () => {
    //             if (camera) {
    //                 setImageUrl(getSnapshot(camera.id) + "?timestamp=" + new Date().getTime())
    //             }
    //         },
    //         500
    //     )
    //
    //     return () => clearInterval(interval)
    // }, [camera]);


    return camera && (
        <div className='singleCamera'>
            <h1 className='pageTitle'>{ camera.name }</h1>
            <div className='content'>
                <div className='cameraAndConfigs'>
                    <img className='image' src={ imageUrl }/>
                    <CameraConfigs camera={camera}/>
                </div>
                <CameraVideos camera={camera}/>
            </div>
        </div>
    ) || <></>
}

export default SingleCamera
