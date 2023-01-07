import axios from 'axios'
import Camera from '../models/Camera'
import API_URL from '../CamerAIConstants'

async function getCameras(): Promise<Camera[]> {
    console.log(`${API_URL}/cameras`)
    let response = await axios.get(`${API_URL}/cameras`)
    console.log(response)
    return [];
}

export default getCameras
