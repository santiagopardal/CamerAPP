import React, { useState, useEffect } from 'react'
import Camera, { CameraJSON } from '../models/Camera'
import { useLocation, useParams } from 'react-router-dom'
import { getCamera } from '../api/Cameras'
import { useNavigate } from 'react-router-dom'
import { getSnapshotUrl } from '../api/Cameras'
import Button from 'react-bootstrap/Button'
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

    const fetchCamera = async () => {
        try {
            let cam = await getCamera(id)
            setCamera(cam)
            updateIsRecording(cam)
            return cam
        } catch (error) {
            navigate('/error')
        }
    }

    useEffect(() => {
        if (location && location.state && location.state.camera) {
            let cameraJson: CameraJSON = location.state.camera
            let newCamera = new Camera(cameraJson)
            setCamera(newCamera)
            updateIsRecording(newCamera)
        } else
            fetchCamera()
    }, [])

    let render = null

    if (camera) {
        render = (
            <>
                <h1>{ camera.getName() }</h1>
                <img src={ getSnapshotUrl(camera) }/>
                <div>
                    <span>Recording</span>
                    <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
                </div>
            </>
        )
    }

    return render
}

export default SingleCamera
