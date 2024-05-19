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
    node: Node
    recording: boolean
    _sensitivity: number

    constructor(json: API.CameraJSON) {
        this.id = json.id
        this.name = json.name
        this.ip = json.ip
        this.streaming_port = json.streaming_port
        this.http_port = json.http_port
        this.width = json.width
        this.height = json.height
        this.framerate = json.framerate
        this.node = json.node
        this.recording = json.recording
        this._sensitivity = json.sensitivity
    }

    async record(record: boolean): Promise<boolean> {
        return await API.record(this, record)
    }

    get sensitivity(): number {
        return this._sensitivity
    }

    set sensitivity(sensitivity: number) {
        if (sensitivity > 1 || sensitivity < 0) {
            throw new Error('Sensitivity must be a value between 0 and 1.')
        }
        this._sensitivity = sensitivity
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
