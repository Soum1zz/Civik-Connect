import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/navbar'

import './App.css'
import Auth from './pages/auth/Auth'
import Citizen from './pages/citizen/Citizen'
import Landing from './pages/landing/Landing'
import Mod from './pages/moderator/Mod'
import Ngo from './pages/ngo/Ngo'
import NgoPublic from './pages/ngo/NgoPublic'
import ProtectedRoute from './authService/ProtectedRoute'
import IssueForm from './pages/issue/IssueForm'
import IssueDetails from './pages/issue/IssueDetails'

function App() {
  const { pathname } = useLocation()
  const showNavbar = !['/citizen', '/issue-form', '/issue-details', '/ngo', '/mod', '/auth'].some((route) => pathname.startsWith(route))

  return (
    <div>
      {showNavbar && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/public-ngo' element={<NgoPublic/>}/>
        <Route path='/citizen' element={<ProtectedRoute><Citizen/></ProtectedRoute>}/>
        <Route path='/issue-form' element={<ProtectedRoute><IssueForm/></ProtectedRoute>}/>
        <Route path='/issue-details' element={<ProtectedRoute><IssueDetails/></ProtectedRoute>}/>
        <Route path='/issue-details/:issueId' element={<ProtectedRoute><IssueDetails/></ProtectedRoute>}/>
        <Route path='/ngo' element={<ProtectedRoute><Ngo/></ProtectedRoute>}/>
        <Route path='/mod' element={<ProtectedRoute><Mod/></ProtectedRoute>}/>
        
      </Routes>

    </div>
  )
}

export default App
