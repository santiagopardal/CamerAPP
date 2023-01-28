import React from 'react'
import Card from 'react-bootstrap/Card'
import {Node} from '../api/Nodes'

type NodeCardProps = {
    node: Node
}

export default function NodeCard({ node }: NodeCardProps) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{`${node.ip}:${node.port}`}</Card.Title>
                <Card.Text>
                    Some node jiji
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
