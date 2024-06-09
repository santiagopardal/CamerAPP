import React, {useState} from "react"
import {Node, NodeType} from "../../../api/Nodes"
import { Button, Dropdown } from "antd"
import {ItemType} from "antd/es/menu/interface"


export type NodeSelectorProps = {
    nodes: Node[],
    onNewNodeSelected: (newNode: Node, oldNode?: Node) => Promise<any>,
    selectedNode?: Node
}


const createNodeItems = (nodes: Node[]) => {
    return nodes.map(
        (node: Node) => (
            {
                label: `Node ${node.id}`,
                key: node.id
            }
        )
    )
}


const NodeSelector = ({ nodes, onNewNodeSelected, selectedNode }: NodeSelectorProps) => {
    const [selected, setSelected] = useState<Node>(selectedNode || nodes[0])

    const items: ItemType[] = createNodeItems(nodes)

    const onNodeClick = async (eventData: any) => {
        const newId = parseInt(eventData.key, 10)

        if (selected == null || newId !== selected.id) {
            const oldNode: Node = selected
            const newNode: Node | undefined = nodes.find(node => node.id === parseInt(eventData.key, 10))

            if (newNode) {
                setSelected(newNode)
                await onNewNodeSelected(newNode, oldNode)
            }
        }
    }

    return <Dropdown menu={{ items, onClick: onNodeClick }} placement="bottomLeft">
        <Button>{ selected && `Node ${selected.id}` }</Button>
    </Dropdown>
}

export default NodeSelector
