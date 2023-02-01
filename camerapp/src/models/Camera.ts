import * as API from '../api/Cameras'

export interface CameraConfigurations {
    recording: boolean,
    sensitivity: number
}

export type CameraJSON = {
    id: number,
    name: string,
    ip: string,
    streaming_port?: number,
    http_port: number,
    width: number,
    height: number,
    framerate: number,
    node: number,
    configurations: CameraConfigurations
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
    private configurations: CameraConfigurations

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
        this.configurations = json.configurations
    }

    async record(record: boolean): Promise<boolean> {
        return await API.record(this, record)
    }

    get recording(): boolean {
        return this.configurations.recording
    }

    set recording(recording: boolean) {
        this.configurations.recording = recording
    }

    get sensitivity(): number {
        return this.configurations.sensitivity
    }

    set sensitivity(sensitivity: number) {
        if (sensitivity > 1 || sensitivity < 0) {
            throw new Error('Sensitivity must be a value between 0 and 1.')
        }
        this.configurations.sensitivity = sensitivity
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
