import Camera from '../models/Camera'
import API_URL from '../CamerAIConstants'
import axios from 'axios'

export interface Video {
    day: string,
    file_size: string
}

export async function getVideos(camera: Camera, from?: string, to?: string): Promise<Video[]> {
    let endpoint = `${API_URL}/cameras/${camera.getID()}/videos`
    if (from && to) {
        endpoint = `${endpoint}/from/${from}/to/${to}`
    }
    let { data } = await axios.get(endpoint)
    return data
}

export async function download(camera: Camera, date: string) {
    await axios.get(`${API_URL}/cameras/${camera.getID()}/videos/download/${date}`)
}
