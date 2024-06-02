import * as API from '../api/Cameras'
import {Node} from '../api/Nodes'

class Camera {

    id: number
    name: string
    ip: string
    streaming_port?: number
    http_port: number
    width: number
    height: number
    framerate: number
    nodes: Node[]
    recording: boolean
    sensitivity: number

    constructor(json: API.CameraJSON) {
        console.log("JSON:", json)
        this.id = json.id
        this.name = json.name
        this.ip = json.ip
        this.streaming_port = json.streaming_port
        this.http_port = json.http_port
        this.width = json.width
        this.height = json.height
        this.framerate = json.framerate
        this.nodes = json.nodes
        this.recording = json.recording
        this.sensitivity = json.sensitivity
    }

    async record(record: boolean): Promise<boolean> {
        return await API.record(this, record)
    }

    get URL(): string {
        return `http://${this.ip}:${this.http_port}`
    }

    async isOnline(): Promise<boolean> {
        return await API.isOnline(this)
    }

    async save() {
        let promise = this.id != undefined ? API.update(this) : API.save(this);
        return await promise
    }
}

export default Camera
