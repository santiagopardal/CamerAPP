import React, {useEffect, useState} from 'react'
import { Node, getNode } from '../../api/Nodes'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export default function SingleNode() {
    const location = useLocation()
    const [node, setNode] = useState<Node>(location.state && location.state.node)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let nodeId = parseInt(id || '1')

        if (!node)
            getNode(nodeId)
                .then(setNode)
                .catch(() => navigate('/error'))
    }, []);

    return <h1>Holas</h1>
}
