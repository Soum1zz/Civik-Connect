import '../../styles/Citizen.css'
import logo from '/logo.png'
import { FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function MyNav({navActive, setNavActive }) {
  return (
    <div className="citizen-sidebar">
      <div className="dash-logo">
        <img src={logo} alt="Civik Connect logo" />
        <p>Civik Connect</p>
      </div>
      <nav>
        <a className={navActive === 'myIssues' ? 'active' : ''} onClick={() => setNavActive('myIssues')}>
          <FaListAlt /> My Issues
        </a>
        <a className={navActive === 'myProfile' ? 'active' : ''} onClick={() => setNavActive('myProfile')}>
          <FaUser /> Profile
        </a>
      </nav>
      <a className="logout-link" href="/">
        <FaSignOutAlt /> Logout
      </a>
    </div>
  );
}
