import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css'
import Auth from './pages/auth/Auth'
import Citizen from './pages/citizen/Citizen'
import Issue from './pages/issue/Issue'
import Landing from './pages/landing/Landing'
import Ngo from './pages/ngo/Ngo'

function App() {
  const { pathname } = useLocation()
  const showNavbar = !['/citizen', '/issue', '/ngo'].includes(pathname)

  return (
    <div>
      {showNavbar && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/citizen' element={<Citizen/>}/>
        <Route path='/issue' element={<Issue/>}/>
        <Route path='/ngo' element={<Ngo/>}/>
        
      </Routes>

    </div>
  )
}

export default App
