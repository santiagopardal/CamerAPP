import React, {useState, useEffect, Dispatch} from 'react'
import Camera from '../models/Camera'
import {useNavigate} from 'react-router-dom'

const useCameraConfigs = (camera: Camera): [setIsRecording: Dispatch<boolean>, isRecording?: boolean] => {
    const [isRecording, setIsRecording] = useState<boolean>()
    const navigate = useNavigate()

    useEffect(() => {
        let recordingPromise = camera.isRecording()
        recordingPromise
            .then(recording => setIsRecording(recording))
            .catch(() => navigate('/error'))
    }, [])

    return [setIsRecording, isRecording]
}

export default useCameraConfigs
