import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import getCameras from '../api/cameras'

function Home() {
    const [] = useState([])
    getCameras()
    return (
        <>
            <h1>Home</h1>
        </>
    )
}

export default Home
