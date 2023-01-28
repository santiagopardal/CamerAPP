import React from 'react'
import ListCard from '../../../components/ListCard'
import {Node} from '../../../api/Nodes'

type NodeCardProps = {
    node: Node
}

export default function NodeCard({ node }: NodeCardProps) {
    return <ListCard title={`${node.ip}:${node.port}`}/>
}
