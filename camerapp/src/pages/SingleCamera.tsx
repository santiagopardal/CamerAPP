import React, { useState, useEffect } from 'react'
import Camera, { CameraJSON } from '../models/Camera'
import { useLocation, useParams } from 'react-router-dom'
import { getCamera } from '../api/Cameras'
import { useNavigate } from 'react-router-dom'
import { getSnapshotUrl } from '../api/Cameras'
import { Switch } from 'antd';

function SingleCamera() {
    const [camera, setCamera] = useState<Camera>()
    const [isRecording, setIsRecording] = useState<boolean>()
    let { id } = useParams()
    let location = useLocation()
    let navigate = useNavigate()

    const switchRecording = () => {
        if (camera) {
            camera.record(!isRecording);
            setIsRecording(!isRecording)
        }
    }

    const updateIsRecording = (camera: Camera) => {
        let recordingPromise = camera.isRecording()
        recordingPromise
            .then(recording => setIsRecording(recording))
            .catch(() => navigate('/error'))
    }

    const updateCamera = async (camera?: Camera) => {
        try {
            let cam = camera ? camera : await getCamera(id)
            setCamera(cam)
            updateIsRecording(cam)
            return cam
        } catch (error) {
            navigate('/error')
        }
    }

    useEffect(() => {
        let newCamera
        if (location && location.state && location.state.camera) {
            let cameraJson: CameraJSON = location.state.camera
            newCamera = new Camera(cameraJson)
        }
        updateCamera(newCamera)
    }, [])

    return (
        <>
        {camera &&
            <>
                <h1>{ camera.getName() }</h1>
                <img src={ getSnapshotUrl(camera) }/>
                <div>
                    <span>Recording</span>
                    <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
                </div>
            </>
        }
        </>
    )
}

export default SingleCamera
