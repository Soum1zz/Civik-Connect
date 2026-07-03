import { FaBell, FaCheckCircle, FaClipboardList, FaHome, FaListAlt, FaSearch, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa'
import logo from '../../../public/logo.png'

export default function ngoNav(){
    return(
        <div>
            <aside className="ngo-sidebar">
                <div className="dash-logo">
                    <img src={logo}/>
                    <p>Civik Connect</p>
                </div>
                <div className="ngo-profile">
                    <div className="ngo-avatar">HH</div>
                    <strong>Helping Hands</strong>
                    <span>NGO Dashboard</span>
                </div>
                <nav>
                    <a className="active" href="/ngo"><FaListAlt /> Available Issues</a>
                    <a href="#assigned"><FaClipboardList /> My Issues</a>
                    <a href="#profile"><FaUser /> Profile</a>
                </nav>
                <a className="logout-link" href="/"><FaSignOutAlt /> Logout</a>
            </aside>
        </div>
    )
}