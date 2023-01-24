import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {getCamera} from '../api/Cameras'
import {getSnapshotUrl} from '../api/Cameras'
import CameraConfigs from '../components/singlecamera/CameraConfigs'
import CameraVideos from '../components/singlecamera/CameraVideos'
import './SingleCamera.css'
import Camera from '../models/Camera'

function SingleCamera() {
    let { id } = useParams()
    let location = useLocation()
    const navigate = useNavigate()
    const [camera, setCamera] = useState<Camera>()

    useEffect(() => {
        let cameraId = parseInt(id || '1')

        if (location.state.camera)
            setCamera(new Camera(location.state.camera))
        else
            getCamera(cameraId)
                .then(setCamera)
                .catch(() => navigate('/error'))
    }, []);


    return camera && (
        <div className='singleCamera'>
            <h1 className='pageTitle'>{ camera.getName() }</h1>
            <div className='content'>
                <div className='cameraAndConfigs'>
                    <img className='image' src={ getSnapshotUrl(camera) }/>
                    <CameraConfigs camera={camera}/>
                </div>
                <CameraVideos camera={camera}/>
            </div>
        </div>
    )
}

export default SingleCamera
