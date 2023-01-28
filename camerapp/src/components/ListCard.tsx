import React from 'react'
import Card from 'react-bootstrap/Card'
import './ListCard.css'

type CardProps = {
    title: string,
    imageSource?: string,
    children?: JSX.Element,
    onClick?: () => any
}

export default function ListCard({ title, imageSource, children, onClick }: CardProps) {
    return (
        <Card className='card' onClick={ onClick }>
            {imageSource && <Card.Img variant="top" src={ imageSource }/>}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                { children }
            </Card.Body>
        </Card>
    )
}
