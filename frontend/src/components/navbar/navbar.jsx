
import logo from 'C:/civikConnect/frontend/public/logo.png'
import { FaRegUser } from 'react-icons/fa'

export default function Navbar() {
    return (
        <header className="landing-nav">
            <div className="nav-logo">
                <img src={logo} alt="Civik Connect"
                />
            </div>

            <nav className="nav-links" aria-label="Main navigation">
                <a className="active" href="#home">Home</a>
                <a href="#ngos">NGOs</a>
            </nav>

            <div className="nav-actions">
                <a className='auth-btn' href="/auth">
                    <FaRegUser />
                    Log In
                </a>
            </div>
        </header>
    )
}
