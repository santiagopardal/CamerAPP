import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'

function CamerAINavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky='top'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>
                            Navbar
                        </Link>
                    </Navbar.Brand>
                    <Nav className='me-auto hover-underline-animation'>
                        <Link to='/cameras'>
                            Cameras
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default CamerAINavBar
