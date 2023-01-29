import React from 'react'
import ListCard from '../../../components/ListCard'
import {Node} from '../../../api/Nodes'
import {useNavigate} from 'react-router-dom'

type NodeCardProps = {
    node: Node
}

export default function NodeCard({ node }: NodeCardProps) {
    const navigate = useNavigate()
    return <ListCard title={`${node.ip}:${node.port}`} onClick={() => navigate(`/nodes/${node.id}`, {state:{node: node}})}/>
}
