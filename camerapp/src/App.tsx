import { useState } from 'react'
import NavBar from './CamerAINavBar'
import CamerAIRoutes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
          <NavBar/>
          <CamerAIRoutes/>
      </>
  )
}

export default App
