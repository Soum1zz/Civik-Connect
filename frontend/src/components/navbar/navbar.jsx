
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
                <a href="#about">About Us</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#ngos">NGOs</a>
                <a href="#issues">Issues</a>
                <a href="#contact">Contact</a>
            </nav>

            <div className="nav-actions">
                <button className='auth-btn'>
                    <FaRegUser />
                    Log In
                </button>
            </div>
        </header>
    )
}
