import { FaBuilding, FaCamera, FaEdit, FaEnvelope, FaHandsHelping, FaLeaf, FaMapMarkerAlt, FaPhoneAlt, FaSeedling, FaShieldAlt, FaUsers } from 'react-icons/fa'
import '../../styles/Ngo.css'
import { useEffect, useState } from 'react'
import { ngoCat } from '../../api/ngoApi';




export default function NgoProfile({myNgo}) {
    const [mycats, setMycats] = useState([]);
    const ngoId= myNgo?.ngoId;
    useEffect(() => {

    if (!ngoId) return;

    async function getCats() {
        try {
            const res = await ngoCat(ngoId);
            setMycats(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    getCats();

}, [ngoId]);
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
                        <h3>{myNgo?.name}</h3>
                        {myNgo?.isVerified &&
                        <span className="ngo-verified-badge"><FaShieldAlt /> Verified NGO</span>}
                        <p><FaEnvelope /> {myNgo?.email}</p>
                        <p><FaPhoneAlt /> {myNgo?.phone}</p>
                        <p><FaMapMarkerAlt /> {myNgo?.address}</p>
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
                    
                        <div className="ngo-profile-info-row" >
                            <label>NGO Name</label>
                            <strong className='' >{myNgo?.name}</strong>
                        </div>
                        <div className="ngo-profile-info-row" >
                            <label>Website</label>
                            <strong className=''>{myNgo?.officialWebsite}</strong>
                        </div>

                        
                    <div className="ngo-profile-info-row">
                        <label>Categories</label>
                        <strong className="ngo-profile-tags">
                            {
                                mycats.map(cat=>(
                                    <span key={cat.id}>
                                        {cat.name}
                                    </span>
                                ))
                            }
                        </strong>
                    </div>
                    <div className="ngo-profile-info-row about-row">
                        <label>About Us</label>
                        <strong>{myNgo?.description}</strong>
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
