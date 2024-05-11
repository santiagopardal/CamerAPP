import axios from 'axios'
import Camera, {CameraConfigurations} from '../models/Camera'
import {Node} from './Nodes'
import API_URL from '../CamerAIConstants'

export type CameraJSON = {
    id: number,
    name: string,
    ip: string,
    streaming_port?: number,
    http_port: number,
    width: number,
    height: number,
    framerate: number,
    node: Node,
    configurations: CameraConfigurations
}

export async function getCameras(): Promise<Camera[]> {
    let response = await axios.get(`${API_URL}/cameras`)
    let cameras: CameraJSON[] = response.data
    return cameras.map(camera => new Camera(camera))
}

export async function getCamera(cameraId: number): Promise<Camera> {
    let response = await axios.get(`${API_URL}/cameras/${cameraId}`)
    let cameraData: CameraJSON = response.data
    return new Camera(cameraData)
}

export async function isOnline(camera: Camera): Promise<boolean> {
    let { data } = await axios.get(`${API_URL}/cameras/${camera.id}/is_online`)
    return data.isOnline
}

export async function record(camera: Camera, startRecording: boolean): Promise<boolean> {
    let { data } = await axios.post(`${API_URL}/cameras/${camera.id}/recording_status`, { record: startRecording })
    return data.isRecording
}

export function getSnapshotUrl(camera: Camera) {
    return `${API_URL}/cameras/snapshot/${camera.id}`
}

export function save(camera: Camera) {
    return axios.post(`${API_URL}/cameras`, camera)
}

export function update(camera: Camera) {
    return axios.patch(`${API_URL}/cameras/${camera.id}`, camera)
}
