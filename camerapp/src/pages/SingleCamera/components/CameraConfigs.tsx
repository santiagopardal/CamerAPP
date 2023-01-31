import React from 'react'
import Camera from '../../../models/Camera'
import {Switch} from 'antd'
import useCameraConfigs from '../../../hooks/useCameraConfigs'
import './CameraConfigs.css'
import {Slider} from '@mui/material'


function CameraConfigs({ camera }: { camera: Camera }) {
    const [setIsRecording, isRecording] = useCameraConfigs(camera)

    const switchRecording = async () => {
        if (camera) {
            setIsRecording(!isRecording)
            let recordingAfterRequest = await camera.record(!isRecording)
            if (recordingAfterRequest === !isRecording)
                setIsRecording(recordingAfterRequest)
            camera.configurations.recording = recordingAfterRequest
            camera.save()
        }
    }

    const updateSensitivity = async (_: React.SyntheticEvent | Event, value: number | number[]) => {
        let sensitivity: number = typeof value === 'number' ? value : value[0]
        camera.configurations.sensitivity = sensitivity / 100
        camera.save()
    }

    return (
        <div className='configs'>
            <h4 className='configsTitle'>Configurations</h4>
            <div className='configsContent'>
                <div className='recordingSwitch'>
                    <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
                    <span>Recording</span>
                </div>
                <span>Running on Node {camera.node}</span>
                <div className='recordingSwitch'>
                    <p>Movement sensitivity</p>
                    <Slider defaultValue={camera.configurations.sensitivity * 100} aria-label="Default" valueLabelDisplay="auto" onChangeCommitted={updateSensitivity} />
                </div>
            </div>
        </div>
    )
}

export default CameraConfigs
