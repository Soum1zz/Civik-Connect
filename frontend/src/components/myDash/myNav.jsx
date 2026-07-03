import '../../styles/Citizen.css'
import logo from '/logo.png'
import { FaHome, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function MyNav() {
  return (
    <div className="citizen-sidebar">
      <div className="dash-logo">
        <img src={logo} alt="Civik Connect logo" />
        <p>Civik Connect</p>
      </div>
      <nav>
        <a className="active" href="#issues">
          <FaListAlt /> My Issues
        </a>
        <a href="#profile">
          <FaUser /> Profile
        </a>
      </nav>
      <a className="logout-link" href="/">
        <FaSignOutAlt /> Logout
      </a>
    </div>
  );
}
