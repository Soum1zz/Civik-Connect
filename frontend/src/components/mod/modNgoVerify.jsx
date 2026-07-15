import { useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaEnvelope,
  FaExclamationTriangle,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { nonverifiedNgo, verifyNgo } from "../../api/modApi";
import Loader from "../Loader/Loader";

function getNgoState(ngo) {
  return ngo?.State || ngo?.state || "State unavailable";
}

export default function ModNgoVerify({ngos}) {
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");



  const filteredNgos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return ngos;

    return ngos.filter((ngo) => {
      return (
        ngo?.name?.toLowerCase().includes(query) ||
        ngo?.email?.toLowerCase().includes(query) ||
        ngo?.address?.toLowerCase().includes(query) ||
        getNgoState(ngo).toLowerCase().includes(query)
      );
    });
  }, [ngos, searchTerm]);

  const handleVerify = async (ngo) => {
    if (!ngo?.ngoId) return;

    setActionId(ngo.ngoId);
    setError("");
    try {
      await verifyNgo(ngo.ngoId);
      setNgos((current) => current.filter((item) => item.ngoId !== ngo.ngoId));
    } catch (e) {
      console.log(e);
      setError("Could not verify this NGO.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="mod-main">
      <header className="mod-header">
        <h1>NGO Requests</h1>
        <p>Review NGO registrations waiting for moderator approval.</p>
      </header>

      <section className="mod-verify-toolbar">
        <div>
          <span>Pending NGOs</span>
          <strong>{filteredNgos.length}</strong>
        </div>
        <label className="mod-verify-search">
          <FaSearch />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search NGO requests"
          />
        </label>
      </section>

      {error && (
        <div className="mod-verify-alert">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="mod-verify-state">
          <Loader />
          <span>Loading NGO requests...</span>
        </div>
      ) : filteredNgos.length > 0 ? (
        <section className="mod-verify-list">
          {filteredNgos.map((ngo) => {
            const busy = actionId === ngo.ngoId;

            return (
              <article className="mod-verify-card mod-ngo-card" key={ngo.ngoId}>
                <div className="mod-verify-icon">
                  <FaUsers />
                </div>

                <div className="mod-verify-content">
                  <div className="mod-verify-title-row">
                    <div>
                      <h2>{ngo.name || "Unnamed NGO"}</h2>
                      <p>
                        <FaMapMarkerAlt />
                        {[ngo.address, getNgoState(ngo)]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                    <span className="mod-review-pill">PENDING</span>
                  </div>

                  <p className="mod-verify-description">
                    {ngo.description || "No description provided."}
                  </p>

                  <div className="mod-verify-meta">
                    <span>
                      <FaEnvelope /> {ngo.email || "No email"}
                    </span>
                    <span>
                      <FaPhoneAlt /> {ngo.phone || "No phone"}
                    </span>
                    <span>
                      <FaGlobe /> {ngo.officialWebsite || "No website"}
                    </span>
                  </div>
                </div>

                <div className="mod-verify-actions">
                  <button
                    type="button"
                    className="mod-verify-accept"
                    disabled={busy}
                    onClick={() => handleVerify(ngo)}
                  >
                    <FaCheck />
                    Verify
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="mod-verify-state">
          <FaUsers />
          <strong>No NGO requests pending</strong>
          <span>New NGO registrations will appear here for approval.</span>
        </div>
      )}
    </div>
  );
}
