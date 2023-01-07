import { useState } from 'react'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [] = useState([])

  return (
      <>
          <NavBar></NavBar>
          <Button>Some react button</Button>
      </>
  )
}

export default App
