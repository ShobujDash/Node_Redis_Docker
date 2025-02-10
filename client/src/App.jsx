import { useState } from 'react'  
import './App.css'
import { Button } from './components/ui/button'
import Navbar from '../pages/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Button>Shobuj Das  </Button>
    </>
  )
}

export default App
