import { FaCamera, FaChartLine, FaEdit, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaUserShield } from 'react-icons/fa'
import '../../styles/Mod.css'

const moderatorRows = [
    { label: 'Moderator ID', value: 'MOD/2024/0567' },
    { label: 'Role', value: 'Content Moderator' },
    { label: 'Joined On', value: 'April 20, 2024' },
    { label: 'Status', value: 'Active', status: true },
]

export default function ModProfile() {
    return (
        <main className="mod-profile-page">
            <header className="mod-profile-hero">
                <div className="mod-profile-hero-icon"><FaUserShield /></div>
                <div>
                    <h1>Moderator Profile</h1>
                    <p>Manage your moderator profile and responsibilities</p>
                </div>
            </header>

            <section className="mod-profile-card">
                <div className="mod-profile-card-title">
                    <h2>My Moderator Profile</h2>
                    <button type="button"><FaEdit /> Edit Profile</button>
                </div>

                <div className="mod-profile-top">
                    <div className="mod-profile-avatar">
                        <FaUserShield />
                        <button type="button" aria-label="Change photo"><FaCamera /></button>
                    </div>
                    <div>
                        <h3>Neha Verma</h3>
                        <span className="mod-verified-badge"><FaShieldAlt /> Verified Moderator</span>
                        <p><FaEnvelope /> neha.verma@civikconnect.org</p>
                        <p><FaPhoneAlt /> +91 99876 54321</p>
                        <p><FaMapMarkerAlt /> Bengaluru, Karnataka</p>
                    </div>
                </div>

                <nav className="mod-profile-tabs" aria-label="Moderator profile sections">
                    <a className="active" href="#overview">Overview</a>
                    <a href="#assigned">Assigned Reports</a>
                    <a href="#activity">Moderation Activity</a>
                    <a href="#statistics">Statistics</a>
                </nav>

                <div className="mod-profile-note">
                    <div><FaShieldAlt /></div>
                    <p><strong>Thank you for keeping Civik Connect safe!</strong>Your moderation helps maintain a trusted community.</p>
                </div>

                <section className="mod-profile-info">
                    <h4>Moderator Information</h4>
                    {moderatorRows.map((row) => (
                        <div className="mod-profile-info-row" key={row.label}>
                            <label>{row.label}</label>
                            <strong>{row.status ? <span className="mod-status-pill">{row.value}</span> : row.value}</strong>
                        </div>
                    ))}
                    <div className="mod-profile-info-row">
                        <label>Areas</label>
                        <strong className="mod-profile-tags">
                            <span>Environment</span>
                            <span>Waste Management</span>
                            <span>Public Safety</span>
                        </strong>
                    </div>
                    <div className="mod-profile-info-row about-row">
                        <label>About</label>
                        <strong>Ensuring reports are genuine and appropriate for a better community experience.</strong>
                    </div>
                </section>

                <div className="mod-profile-metrics">
                    <div><FaChartLine /><strong>1,247</strong><span>Total Reviewed</span></div>
                    <div><FaShieldAlt /><strong>1,102</strong><span>Approved</span></div>
                    <div><FaUserShield /><strong>98%</strong><span>Excellent</span></div>
                </div>
            </section>
        </main>
    )
}
