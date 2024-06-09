import React, {useEffect, useState} from 'react'
import Camera from '../../../models/Camera'
import {Switch} from 'antd'
import useCameraConfigs from '../../../hooks/useCameraConfigs'
import './CameraConfigs.css'
import {Slider} from '@mui/material'
import {getNodes, Node, NodeType} from "../../../api/Nodes";
import NodeSelector from "./NodeSelector";


function CameraConfigs({ camera }: { camera: Camera }) {
    const [setIsRecording, isRecording] = useCameraConfigs(camera)
    const [nodes, setNodes] = useState<Node[]>([])

    useEffect(() => {
        getNodes().then(setNodes)
    }, []);

    const switchRecording = async () => {
        if (camera) {
            setIsRecording(!isRecording)
            let recordingAfterRequest = await camera.record(!isRecording)
            if (recordingAfterRequest === !isRecording)
                setIsRecording(recordingAfterRequest)
            camera.recording = recordingAfterRequest
            camera.save()
        }
    }

    const updateSensitivity = async (_: React.SyntheticEvent | Event, value: number | number[]) => {
        let sensitivity: number = typeof value === 'number' ? value : value[0]
        camera.sensitivity = sensitivity / 100
        camera.save()
    }

    const updateCameraNodes = async (nodeToAdd: Node, nodeToRemove?: Node) => {
        if (nodeToRemove)
            camera.nodes = camera.nodes.filter(node => node.id !== nodeToRemove.id)

        camera.nodes.push(nodeToAdd)
        await camera.save()
    }

    const observerNode = camera.nodes.find(node => node.type === NodeType.OBSERVER)
    const processingNode = camera.nodes.find(node => node.type === NodeType.PROCESSOR)

    return (
        <div className='configs'>
            <h4 className='configsTitle'>Configurations</h4>
            <div className='configsContent'>
                <div className='recordingSwitch'>
                    <Switch checked={isRecording} onChange={switchRecording}></Switch>
                    <span>Recording</span>
                </div>

                <span>
                    {'Running on '}
                    <NodeSelector
                        nodes={nodes.filter(node => node.type === NodeType.OBSERVER)}
                        onNewNodeSelected={updateCameraNodes}
                        selectedNode={observerNode}
                    />
                </span>
                <span>
                    {'Processing on '}
                    <NodeSelector
                        nodes={nodes.filter(node => node.type === NodeType.PROCESSOR)}
                        onNewNodeSelected={updateCameraNodes}
                        selectedNode={processingNode}
                    />
                </span>
                <div className='recordingSwitch'>
                    <p>Movement sensitivity</p>
                    <Slider
                        defaultValue={camera.sensitivity * 100}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChangeCommitted={updateSensitivity}
                    />
                </div>
            </div>
        </div>
    )
}

export default CameraConfigs
