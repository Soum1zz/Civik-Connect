import { FaBuilding, FaCamera, FaEdit, FaEnvelope, FaHandsHelping, FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaSeedling, FaShieldAlt, FaUsers } from 'react-icons/fa'
import '../../styles/Ngo.css'


const organizationRows = [
    { label: 'NGO Name', value: 'Green Earth Foundation' },
    { label: 'Registration Number', value: 'NGO/KA/2021/123456' },
    { label: 'Website', value: 'www.greenearth.org', link: true },
    { label: 'Established On', value: 'March 10, 2021' },
]

export default function NgoProfile() {
    return (
        <main className="ngo-profile-page">

            <section className="ngo-profile-card">
                <div className="ngo-profile-card-title">
                    <h2>My Organization Profile</h2>
                    <button type="button"><FaEdit /> Edit Profile</button>
                </div>

                <div className="ngo-profile-top">
                    <div className="ngo-profile-avatar">
                        <FaSeedling />
                    </div>
                    <div>
                        <h3>Green Earth Foundation</h3>
                        <span className="ngo-verified-badge"><FaShieldAlt /> Verified NGO</span>
                        <p><FaEnvelope /> contact@greenearth.org</p>
                        <p><FaPhoneAlt /> +91 91234 56789</p>
                        <p><FaMapMarkerAlt /> Bengaluru, Karnataka</p>
                    </div>
                </div>

                <nav className="ngo-profile-tabs" aria-label="NGO profile sections">
                    <a className="active" href="#overview">Overview</a>
                    <a href="#team">Team Members</a>
                    <a href="#documents">Documents</a>
                </nav>

                <div className="ngo-profile-note">
                    <div><FaHandsHelping /></div>
                    <p><strong>Thank you for your commitment!</strong>Together we are building a sustainable future.</p>
                </div>

                <section className="ngo-profile-info">
                    <h4>Organization Information</h4>
                    {organizationRows.map((row) => (
                        <div className="ngo-profile-info-row" key={row.label}>
                            <label>{row.label}</label>
                            <strong className={row.link ? 'link-value' : ''}>{row.value}</strong>
                        </div>
                    ))}
                    <div className="ngo-profile-info-row">
                        <label>Categories</label>
                        <strong className="ngo-profile-tags">
                            <span>Environment</span>
                            <span>Education</span>
                            <span>Women Welfare</span>
                        </strong>
                    </div>
                    <div className="ngo-profile-info-row about-row">
                        <label>About Us</label>
                        <strong>We work towards creating a sustainable environment through awareness, plantation drives and waste management initiatives.</strong>
                    </div>
                </section>

                <div className="ngo-profile-metrics">
                    <div><FaBuilding /><strong>12</strong><span>Active Projects</span></div>
                    <div><FaUsers /><strong>248</strong><span>Registered</span></div>
                    <div><FaLeaf /><strong>1,850</strong><span>Overall Impact</span></div>
                </div>
            </section>
        </main>
    )
}
