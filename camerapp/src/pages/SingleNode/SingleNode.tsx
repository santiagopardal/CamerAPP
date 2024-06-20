import React, {useEffect, useState} from 'react'
import { Node, getNode } from '../../api/Nodes'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import './SingleNode.css'
import Camera from '../../models/Camera'
import CameraCard from '../Cameras/components/CameraCard'
import SearchablePaginatableCards from '../../components/SearchablePaginatableCards'
import {getCameras} from '../../api/Nodes'

export default function SingleNode() {
    const location = useLocation()
    const [node, setNode] = useState<Node>()
    let { id } = useParams()
    const navigate = useNavigate()
    const nodeId = parseInt(id || '1')

    useEffect(() => {
        if (location.state && location.state.node) {
            setNode(location.state.node)
        }
        else
            getNode(nodeId)
                .then(setNode)
                .catch(() => navigate('/error'))
    }, [])

    return node &&
        <>
        <div className='singleNode'>
            <h1>Node {node.id} running at {node.ip}:{node.port}</h1>
            <h3>{node.type}</h3>
            <div className='camerasSection'>
                <h2>Cameras being handled by the node</h2>
                <SearchablePaginatableCards
                    fetch={(howMany: number, startingIndex: number) => getCameras(nodeId)}
                    getPropertyToCompare={(camera: Camera) => camera.name}
                    createCard={(camera: Camera) => <CameraCard key={camera.id} camera={camera}/>}
                    comparator={ (first: Camera, second: Camera) => first.id >= second.id ? 1 : -1 }
                />
            </div>
        </div>
    </> || <></>
}
