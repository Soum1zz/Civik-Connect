import { FaBell, FaCheckCircle, FaClipboardList, FaHome, FaListAlt, FaSearch, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa'
import logo from '../../../public/logo.png'
import { getCurrentUser, logout } from '../../authService/authService'
import { useEffect, useState } from 'react'

export default function ngoNav({navActive, setNavActive, myNgo}){



    return(
        <div>
            <aside className="ngo-sidebar">
                <div className="dash-logo">
                    <img src={logo}/>
                    <p>Civik Connect</p>
                </div>
                <div className="ngo-profile">
                    <div className="ngo-avatar">{myNgo?.name.charAt(0).toUpperCase()}</div>
                    <strong>{myNgo?.name}</strong>
                    <span>NGO Dashboard</span>
                </div>
                <nav>
                    <a className={navActive==="avIssues" ?"active":""}
                    onClick={()=>{setNavActive("avIssues")}}
                    ><FaListAlt /> Available Issues</a>
                    <a className={navActive==="myIssues" ?"active":""}
                    onClick={()=>{setNavActive("myIssues")}}
                    ><FaClipboardList /> My Issues</a>
                    <a className={navActive==="ngoProf" ?"active":""}
                    onClick={()=>{setNavActive("ngoProf")}}
                    ><FaUser /> Profile</a>
                </nav>
                <a className="logout-link" 
                onClick={()=>logout()}
                ><FaSignOutAlt /> Logout</a>
            </aside>
        </div>
    )
}