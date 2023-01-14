import * as API from '../api/Cameras'

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

    constructor({id, name, ip, streaming_port, http_port, width, height, framerate, node}: {
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
    ) {
        this.id = id
        this.name = name
        this.ip = ip
        this.streaming_port = streaming_port
        this.http_port = http_port
        this.width = width
        this.height = height
        this.framerate = framerate
        this.node = node
    }

    getID(): number {
        return this.id
    }

    async record(record: boolean) {
        await API.record(this, record)
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

    isOnline(): boolean {
        return true
    }
}

export default Camera
