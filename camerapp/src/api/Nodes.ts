import axios from 'axios'
import API_URL from '../CamerAIConstants'
import Camera, {CameraJSON} from '../models/Camera'

export interface Node {
    id: number,
    ip: string,
    port: number
}

export async function getNodes(): Promise<Node[]> {
    let { data } = await axios.get(`${API_URL}/node`)
    return data
}

export async function getNode(id: number): Promise<Node> {
    let { data } = await axios.get(`${API_URL}/node/${id}`)
    return data
}

export async function getCameras(id: number): Promise<Camera[]> {
    let response = await axios.get(`${API_URL}/node/${id}/cameras`)
    let cameras = response.data
    return cameras.map((camera: CameraJSON) => new Camera(camera));
}
