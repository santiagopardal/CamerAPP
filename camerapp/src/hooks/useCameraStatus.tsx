import React, {useState, useEffect, Dispatch} from 'react'
import Camera, {CameraJSON} from '../models/Camera'
import {getCamera} from '../api/Cameras'
import {useNavigate} from 'react-router-dom'

const useCameraStatus = (id: number, cameraProps?: CameraJSON): [setIsRecording: Dispatch<boolean>, camera?: Camera, isRecording?: boolean] => {
    const [camera, setCamera] = useState<Camera>()
    const [isRecording, setIsRecording] = useState<boolean>()
    const navigate = useNavigate()

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
        let newCamera = cameraProps ? new Camera(cameraProps) : undefined
        updateCamera(newCamera)
    }, [])

    return [setIsRecording, camera, isRecording]
}

export default useCameraStatus
