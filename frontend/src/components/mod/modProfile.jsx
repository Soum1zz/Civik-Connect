import { FaCamera, FaChartLine, FaEdit, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaShieldAlt, FaUserShield } from 'react-icons/fa'
import '../../styles/Mod.css'


export default function ModProfile({myMod}) {
    return (
        <main className="mod-profile-page">

            <section className="mod-profile-card">
                <div className="mod-profile-card-title">
                    <h2>My Moderator Profile</h2>
                    <button type="button"><FaEdit /> Edit Profile</button>
                </div>

                <div className="mod-profile-top">
                    <div className="mod-profile-avatar">
                        <FaUserShield />
                        {/* <button type="button" aria-label="Change photo"><FaCamera /></button> */}
                    </div>
                    <div>
                        <h3>{myMod?.name}</h3>
                        <p><FaPhoneAlt /> {myMod?.phoneNumber}</p>
                        <p><FaEnvelope /> {myMod?.email}</p>

                    </div>
                </div>
                <div className="mod-profile-note">
                    <div><FaShieldAlt /></div>
                    <p><strong>Thank you for keeping Civik Connect safe!</strong>Your moderation helps maintain a trusted community.</p>
                </div>



            </section>
        </main>
    )
}
