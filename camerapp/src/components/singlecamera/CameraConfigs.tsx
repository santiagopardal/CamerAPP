import React from 'react'
import Camera from '../../models/Camera'
import {Switch} from 'antd'
import useCameraConfigs from '../../hooks/useCameraConfigs'
import './CameraConfigs.css'


function CameraConfigs({ camera }: { camera: Camera }) {
    const [setIsRecording, isRecording] = useCameraConfigs(camera)

    const switchRecording = () => {
        if (camera) {
            camera.record(!isRecording);
            setIsRecording(!isRecording)
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
