import { FaChartBar, FaClipboardCheck, FaClipboardList, FaHome, FaRegEye, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa'
import logo from '/logo.png'


export default function modNav({navActive,setNavActive}){
    return(
            <div className="mod-sidebar">
                <div className="dash-logo">
                    <img src={logo}/>
                    <p>Civik Connect</p>
                </div>
                <nav>
                    <a className={navActive === 'modAna' ? 'active' : ''}
                    onClick={() => setNavActive('modAna')}><FaChartBar /> Analytics</a>
                    <a className={navActive === 'modVeri' ? 'active' : ''}
                    onClick={() => setNavActive('modVeri')}><FaClipboardCheck /> Verify Issues</a>
                    <a className={navActive === 'modnreq' ? 'active' : ''}
                    onClick={() => setNavActive('modnreq')}><FaUsers /> NGO Requests</a>
                    <a className={navActive === 'modireq' ? 'active' : ''}
                    onClick={() => setNavActive('modireq')}><FaClipboardList /> Issue Requests</a>
                    <a className={navActive === 'modProf' ? 'active' : ''}
                    onClick={() => setNavActive('modProf')}><FaUser /> My Profile</a>
                </nav>

                <a className="mod-logout" href="/"><FaSignOutAlt /> Logout</a>
            </div>
    )
}