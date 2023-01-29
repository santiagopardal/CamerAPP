import axios from 'axios'
import API_URL from '../CamerAIConstants'

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
