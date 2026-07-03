import { FaCameraRetro, FaEdit, FaEnvelope, FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaRegUser, FaShieldAlt, FaTrophy, FaUserFriends } from 'react-icons/fa'
import '../../styles/Citizen.css'

const infoRows = [
    { icon: <FaRegUser />, label: 'Full Name', value: 'Arjun Sharma' },
    { icon: <FaEnvelope />, label: 'Email', value: 'arjun.sharma@email.com' },
    { icon: <FaPhoneAlt />, label: 'Phone Number', value: '+91 98765 43210' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Bengaluru, Karnataka' },
    { icon: <FaUserFriends />, label: 'Member Since', value: 'May 15, 2024' },
]

export default function MyProfile() {
    return (
        <main className="profile-page citizen-profile-page">
            <section className="profile-card">
                <div className="profile-card-title">
                    <h2>My Profile</h2>
                    <button type="button"><FaEdit /> Edit Profile</button>
                </div>

                <div className="profile-top">
                    <div className="profile-avatar citizen-avatar">
                        <FaRegUser />
                        {/* <button type="button" aria-label="Change photo"><FaCameraRetro /></button> */}
                    </div>
                    <div>
                        <h3>Arjun Sharma</h3>
                        <p><FaEnvelope /> arjun.sharma@email.com</p>
                        <p><FaPhoneAlt /> +91 98765 43210</p>
                    </div>
                </div>


                <div className="profile-note">
                    <div><FaLeaf /></div>
                    <p><strong>Thank you for being a part of Civik Connect!</strong>Your actions contribute to a cleaner and better society.</p>
                </div>

                <section className="profile-info">
                    <h4>Personal Information</h4>
                    {infoRows.map((row) => (
                        <div className="profile-info-row" key={row.label}>
                            <span>{row.icon}</span>
                            <label>{row.label}</label>
                            <strong>{row.value}</strong>
                        </div>
                    ))}
                </section>


            </section>
        </main>
    )
}
