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

    constructor(
        id: number,
        name: string,
        ip: string,
        http_port: number,
        width: number,
        height: number,
        framerate: number,
        node: number,
        streaming_port?: number
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

    getName(): string {
        return this.name;
    }

    getURL(): string {
        return `http://${this.ip}:${this.http_port}`
    }
}

export default Camera
