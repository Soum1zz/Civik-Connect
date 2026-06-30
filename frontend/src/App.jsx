import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css'
import Landing from './pages/landing/Landing'

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        
      </Routes>

    </div>
  )
}

export default App
