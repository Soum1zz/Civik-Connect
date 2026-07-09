import {
  FaCameraRetro,
  FaEdit,
  FaEnvelope,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegUser,
  FaShieldAlt,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import "../../styles/Citizen.css";
import { useEffect, useState } from "react";



export default function MyProfile({user}) {


  return (
    <main className="profile-page citizen-profile-page">
      <section className="profile-card">
        <div className="profile-card-title">
          <h2>My Profile</h2>
          <button type="button">
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-top">
          <div className="profile-avatar citizen-avatar">
            <FaRegUser />
            {/* <button type="button" aria-label="Change photo"><FaCameraRetro /></button> */}
          </div>
          <div>
            <h3>{user?.name}</h3>
            <p>
              <FaEnvelope /> {user?.email}
            </p>
            <p>
              <FaPhoneAlt /> {user?.phoneNumber}
            </p>
          </div>
        </div>

        <div className="profile-note">
          <div>
            <FaLeaf />
          </div>
          <p>
            <strong>Thank you for being a part of Civik Connect!</strong>Your
            actions contribute to a cleaner and better society.
          </p>
        </div>

        
      </section>
    </main>
  );
}
