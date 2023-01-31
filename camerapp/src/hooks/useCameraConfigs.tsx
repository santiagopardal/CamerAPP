import React, {useState, useEffect, Dispatch} from 'react'
import Camera from '../models/Camera'
import {useNavigate} from 'react-router-dom'

const useCameraConfigs = (camera: Camera): [setIsRecording: Dispatch<boolean>, isRecording?: boolean, isOnline?: boolean] => {
    const [isOnline, setIsOnline] = useState<boolean>()
    const [isRecording, setIsRecording] = useState<boolean>()
    const navigate = useNavigate()

    useEffect(() => {
        setIsRecording(camera.isRecording())
        camera.isOnline().then(setIsOnline).catch(() => navigate('/error'))
    }, []);


    return [setIsRecording, isRecording, isOnline]
}

export default useCameraConfigs
