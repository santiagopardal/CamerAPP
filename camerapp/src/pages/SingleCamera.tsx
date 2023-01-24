import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import useCameraStatus from '../hooks/useCameraStatus'
import {getSnapshotUrl} from '../api/Cameras'
import {Switch} from 'antd'
import CameraVideos from '../components/singlecamera/CameraVideos'
import './SingleCamera.css'

function SingleCamera() {
    let { id } = useParams()
    let location = useLocation()
    const [setIsRecording, camera, isRecording] = useCameraStatus(parseInt(id || '1'), location.state.camera)
    const switchRecording = () => {
        if (camera) {
            camera.record(!isRecording);
            setIsRecording(!isRecording)
        }
    }

    return camera && (
        <div className='singleCamera'>
            <h1 className='pageTitle'>{ camera.getName() }</h1>
            <div className='content'>
                <div className='cameraAndConfigs'>
                    <img className='image'src={ getSnapshotUrl(camera) }/>
                    <div className='configs'>
                        <h4 className='configsTitle'>Configurations</h4>
                        <div className='configsContent'>
                            <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
                            <span>Recording</span>
                        </div>
                    </div>
                </div>
                <CameraVideos camera={camera}/>
            </div>
        </div>
    )
}

export default SingleCamera
