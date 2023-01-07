import axios from 'axios'
import Camera from '../models/Camera'
import API_URL from '../CamerAIConstants'

async function getCameras(): Promise<Camera[]> {
    let response = await axios.get(`${API_URL}/cameras`)
    let cameras: Object[] = response.data
    return cameras.map(camera => new Camera(camera.id, camera.name, camera.ip, camera.http_port, camera.width, camera.height, camera.framerate, camera.node, camera.streaming_port));
}

export default getCameras
