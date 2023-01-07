import { useState } from 'react'
import NavBar from './CamerAINavBar'
import Home from './routes/Home'
import Login from './routes/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";

function App() {
  const [] = useState([])

  return (
      <>
          <NavBar></NavBar>
          <Routes>
              <Route path="/" element={ <Home/> }/>
              <Route path="/login" element={ <Login/> }/>
          </Routes>
      </>
  )
}

export default App
