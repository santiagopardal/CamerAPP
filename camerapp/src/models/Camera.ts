import * as API from '../api/Cameras'

export interface CameraJSON {
    id: number,
    name: string,
    ip: string,
    streaming_port?: number,
    http_port: number,
    width: number,
    height: number,
    framerate: number,
    node: number
}

class Camera {

    id: number
    name: string
    ip: string
    streaming_port?: number
    http_port: number
    width: number
    height: number
    framerate: number
    node: number

    constructor(json: CameraJSON) {
        this.id = json.id
        this.name = json.name
        this.ip = json.ip
        this.streaming_port = json.streaming_port
        this.http_port = json.http_port
        this.width = json.width
        this.height = json.height
        this.framerate = json.framerate
        this.node = json.node
    }

    getID(): number {
        return this.id
    }

    async record(record: boolean): Promise<boolean> {
        return await API.record(this, record)
    }

    async isRecording() {
        return await API.isRecording(this)
    }

    getName(): string {
        return this.name
    }

    getURL(): string {
        return `http://${this.ip}:${this.http_port}`
    }

    async isOnline(): Promise<boolean> {
        return await API.isOnline(this)
    }
}

export default Camera
