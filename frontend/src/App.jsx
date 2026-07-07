import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css'
import Auth from './pages/auth/Auth'
import Citizen from './pages/citizen/Citizen'
import Issue from './pages/issue/Issue'
import Landing from './pages/landing/Landing'
import Mod from './pages/moderator/Mod'
import Ngo from './pages/ngo/Ngo'
import ProtectedRoute from './authService/ProtectedRoute'

function App() {
  const { pathname } = useLocation()
  const showNavbar = !['/citizen', '/issue', '/ngo', '/mod'].includes(pathname)

  return (
    <div>
      {showNavbar && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/citizen' element={<ProtectedRoute><Citizen/></ProtectedRoute>}/>
        <Route path='/issue' element={<ProtectedRoute><Issue/></ProtectedRoute>}/>
        <Route path='/ngo' element={<ProtectedRoute><Ngo/></ProtectedRoute>}/>
        <Route path='/mod' element={<ProtectedRoute><Mod/></ProtectedRoute>}/>
        
      </Routes>

    </div>
  )
}

export default App
