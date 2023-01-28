import React from 'react'
import SearchablePaginatableCards from '../components/SearchablePaginatableCards'
import {Node, getNodes} from '../api/Nodes'
import NodeCard from '../components/NodeCard'


export default function Nodes() {
    return <SearchablePaginatableCards
        fetch={ (howMany: number, startingIndex: number) => getNodes() }
        getPropertyToCompare={ (node: Node) => node.ip }
        createCard={ (node: Node) => <NodeCard key={node.id} node={node}/> }
    />
}
