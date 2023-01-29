import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import './CamerAINavBar.css'

function CamerAINavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky='top'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>
                            CamerAI
                        </Link>
                    </Navbar.Brand>
                    <Nav className='link hover-underline-animation'>
                        <Link to='/cameras'>
                            Cameras
                        </Link>
                    </Nav>
                    <Nav className='link align-baseline hover-underline-animation'>
                        <Link to='/nodes'>
                            Nodes
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default CamerAINavBar
