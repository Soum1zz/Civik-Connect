import {
  FaBookOpen,
  FaCheckCircle,
  FaHandsHelping,
  FaHeart,
  FaLeaf,
  FaMapMarkerAlt,
  FaPaw,
  FaTint,
  FaUserShield,
} from "react-icons/fa";


export default function NgoPublicCard({ ngo }) {
  const Icon = FaHandsHelping;

  return (
    <article className="ngo-public-card">
      <div className="ngo-public-card-heading">
        <div className={`ngo-public-icon ${ngo.icon || "community"}`}>
          <Icon />
        </div>
        <h2>{ngo.name}</h2>
        {ngo.isVerified && (
          <FaCheckCircle className="ngo-public-verified" aria-label="Verified NGO" />
        )}
      </div>

      <p className="ngo-public-description">{ngo.description}</p>

      <p className="ngo-public-location">
        <FaMapMarkerAlt />
        <span>{ngo.location}</span>
      </p>

    </article>
  );
}
