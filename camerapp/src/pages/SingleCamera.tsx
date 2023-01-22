import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import useCameraStatus from '../hooks/useCameraStatus'
import {getSnapshotUrl} from '../api/Cameras'
import {Switch} from 'antd'
import CameraVideos from '../components/singlecamera/CameraVideos'

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
        <>
            <h1>{ camera.getName() }</h1>
            <img src={ getSnapshotUrl(camera) }/>
            <div>
                <span>Recording</span>
                <Switch checked={ isRecording } onChange={ switchRecording }></Switch>
            </div>
            <CameraVideos camera={camera}/>
        </>
    )
}

export default SingleCamera
