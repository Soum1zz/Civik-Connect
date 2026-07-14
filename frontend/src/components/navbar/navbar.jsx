
import logo from 'C:/civikConnect/frontend/public/logo.png'
import { FaRegUser, FaUser } from 'react-icons/fa'
import { MdLogout } from "react-icons/md";

import { getCurrentUser, logout } from '../../authService/authService'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const user = getCurrentUser();
    console.log(user);
    const role = user?.role;

    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    return (
        <header className="landing-nav">
            <div className="nav-logo"
            >
                <img src={logo} alt="Civik Connect"
                onClick={()=>navigate("/")}
                />
            </div>

            <nav className="nav-links" aria-label="Main navigation">
                <a className={pathname === "/" ? "active" : ""}
                onClick={()=>navigate("/")}
                >Home</a>
                <a className={pathname === "/public-ngo" ? "active" : ""}
                onClick={()=>navigate("/public-ngo")}
                >NGOs</a>
            </nav>

            <div className="nav-actions">
                <a className='auth-btn' href="/auth">
                    {
                    user?
                    (
                            <div
                            className='auth-btn'
                            onClick={()=>{
                                logout();
                            }}>
                                <MdLogout/>
                                Log Out
                            </div>
                            
                    ):
                    (   
                        <div
                        className='auth-btn'
                        onClick={()=>navigate("/auth")}
                        >
                            <FaRegUser />
                            Log In  
                        </div>
                        
                    )
                    }
                </a>
                {
                    user&&
                    <div
                            onClick={()=>{
                                if(role === "MODERATOR") navigate("/mod")
                                if(role === "NGO") navigate("/ngo")
                                if(role === "REGULAR") navigate("/citizen")

                            }}
                            className='profile-btn'
                            >
                                <FaUser/>
                            </div>
                }
            </div>
        </header>
    )
}
