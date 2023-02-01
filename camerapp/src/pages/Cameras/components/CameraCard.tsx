import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Camera from '../../../models/Camera'
import Button from 'react-bootstrap/Button'
import './CameraCard.css'
import { useNavigate } from 'react-router-dom'
import { getSnapshotUrl } from '../../../api/Cameras'
import useCameraConfigs from '../../../hooks/useCameraConfigs'
import ListCard from '../../../components/ListCard'

function CameraCard(properties: {camera: Camera}) {
    let camera: Camera = properties.camera
    let [_, __, isOnline] = useCameraConfigs(camera)
    let connectedClass = `status ${isOnline ? 'connectedStatus' : 'disconnectedStatus'}`
    let connectedLabel = isOnline ? 'Online' : 'Offline'
    let navigate = useNavigate()

    const openCamera = () => {
        navigate(`/cameras/${camera.id}`, {state:{camera: camera}})
    }

    return (
        <ListCard
            title={ camera.name }
            imageSource={ isOnline ? getSnapshotUrl(camera) : undefined }
            onClick={ openCamera }
        >
            <div className='cardContent'>
                <div className='connectionStatus'>
                    <span className={ connectedClass }>●</span>
                    <span>{ connectedLabel }</span>
                </div>
                <Button className='button' variant="primary" href={ camera.URL }>Go to camera</Button>
            </div>
        </ListCard>
    )
}

export default CameraCard
