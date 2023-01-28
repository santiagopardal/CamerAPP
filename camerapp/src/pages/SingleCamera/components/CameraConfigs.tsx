import React from 'react'
import Camera from '../../../models/Camera'
import {Switch} from 'antd'
import useCameraConfigs from '../../../hooks/useCameraConfigs'
import './CameraConfigs.css'


function CameraConfigs({ camera }: { camera: Camera }) {
    const [setIsRecording, isRecording] = useCameraConfigs(camera)

    const switchRecording = async () => {
        if (camera) {
            setIsRecording(!isRecording)
            let recordingAfterRequest = await camera.record(!isRecording)
            if (recordingAfterRequest === !isRecording)
                setIsRecording(recordingAfterRequest)
        }
    }

    return (
        <div className='configs'>
            <h4 className='configsTitle'>Configurations</h4>
            <div className='configsContent'>
                <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
                <span>Recording</span>
            </div>
        </div>
    )
}

export default CameraConfigs
