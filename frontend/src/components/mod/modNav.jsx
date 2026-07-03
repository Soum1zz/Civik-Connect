import { FaChartBar, FaClipboardCheck, FaClipboardList, FaHome, FaRegEye, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import logo from '/logo.png'


export default function modNav(){
    return(
            <div className="mod-sidebar">
                <div className="dash-logo">
                    <img src={logo}/>
                    <p>Civik Connect</p>
                </div>
                <nav>
                    <a className="active" href="#analytics"><FaChartBar /> Analytics</a>
                    <a href="#verify"><FaClipboardCheck /> Verify Issues</a>
                    <a href="#ngo-requests"><FaUsers /> NGO Requests</a>
                    <a href="#issue-requests"><FaClipboardList /> Issue Requests</a>
                </nav>

                <a className="mod-logout" href="/"><FaSignOutAlt /> Logout</a>
            </div>
    )
}