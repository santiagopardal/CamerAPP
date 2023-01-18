import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getCameras } from '../api/Cameras'
import Camera from '../models/Camera'
import CameraCard from '../components/CameraCard'
import PaginatableCards from '../components/PaginatableCards'
import Form from 'react-bootstrap/Form'
import './Cameras.css'
import { SpeedDial } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'

function Cameras() {
    const [filterFunction, setFilterFunction] = useState<(camera: Camera) => boolean>()

    const newTextSearch = (searcher) => {
        let text = searcher ? searcher.target.value : null
        let filter = (camera: Camera) => true
        if (text != '') {
            filter = (camera: Camera) => {
                let cameraName = camera.getName().toLowerCase()
                text = text.toLowerCase()
                return cameraName.includes(text)
            }
        }
        setFilterFunction(() => filter)
    }

    return (
        <>
            <div className='actions'>
                <Form.Control type='search' placeholder='Search' aria-label='Search' onChange={newTextSearch}></Form.Control>
            </div>
            <PaginatableCards
                fetch={ getCameras }
                paginationSize={10}
                createCard={ (camera: Camera) => <CameraCard key={camera.getID()} camera={camera}/> }
                filterFunction={ filterFunction }
            />
            <SpeedDial
                ariaLabel="SpeedDial controlled open example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            />
        </>
    )
}

export default Cameras
