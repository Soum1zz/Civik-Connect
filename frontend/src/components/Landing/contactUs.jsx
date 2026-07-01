import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

export default function ContactUs() {
    return (
        <footer className="landing-footer" id="contact">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span>Civik Connect</span>
                    </div>
                    <p>Connecting citizens, NGOs, and authorities to build a cleaner, safer and better tomorrow.</p>
                </div>

                <div>
                    <h3>Quick Links</h3>
                    <a href="#home">About Us</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#ngos">NGOs</a>
                    <a href="#contact">Contact</a>
                </div>

                <div>
                    <h3>For Citizens</h3>
                    <a href="#report">Report an Issue</a>
                    <a href="#my-issues">My Issues</a>
                    <a href="#track">Track Issues</a>
                </div>

                <div>
                    <h3>For NGOs</h3>
                    <a href="#register-ngo">Register NGO</a>
                    <a href="#available">Available Issues</a>
                    <a href="#assigned">My Assigned Issues</a>
                </div>

                <div>
                    <h3>Contact Us</h3>
                    <a href="mailto:support@civikconnect.com"><FaEnvelope /> support@civikconnect.com</a>
                    <a href="tel:+919876543210"><FaPhoneAlt /> +91 98765 43210</a>
                    <a href="#contact"><FaMapMarkerAlt /> Kolkata, West Bengal, India</a>
                </div>
            </div>

            <div className="footer-bottom">
                <span>&copy; 2024 Civik Connect. All rights reserved.</span>
                <div>
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#cookies">Cookie Policy</a>
                </div>
            </div>
        </footer>
    )
}
