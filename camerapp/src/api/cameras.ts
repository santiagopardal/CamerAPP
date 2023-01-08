import axios from 'axios'
import Camera from '../models/Camera'
import API_URL from '../CamerAIConstants'

export async function getCameras(): Promise<Camera[]> {
    let response = await axios.get(`${API_URL}/cameras`)
    let cameras:
        {
            id: number,
            name: string,
            ip: string,
            streaming_port?: number,
            http_port: number,
            width: number,
            height: number,
            framerate: number,
            node: number
        }[] = response.data
    return cameras.map(camera => new Camera(camera));
}

export async function getCamera(cameraId: number): Promise<Camera> {
    console.log(`${API_URL}/cameras/${cameraId}`)
    let response = await axios.get(`${API_URL}/cameras/${cameraId}`)
    let cameraData: {
        id: number,
        name: string,
        ip: string,
        streaming_port?: number,
        http_port: number,
        width: number,
        height: number,
        framerate: number,
        node: number
    } = response.data
    return new Camera(cameraData)
}
