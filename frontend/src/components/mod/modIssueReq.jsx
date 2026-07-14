import { useMemo, useState } from "react";
import {
  FaCheck,
  FaClipboardList,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assignIssue } from "../../api/modApi";

function formatRequestDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function readRequests() {
  try {
    return JSON.parse(localStorage.getItem("ngoIssueRequests") || "[]");
  } catch (e) {
    console.log(e);
    return [];
  }
}

function writeRequests(requests) {
  localStorage.setItem("ngoIssueRequests", JSON.stringify(requests));
}

export default function ModIssueReq() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(() => readRequests());
  const [actionId, setActionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const filteredRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return requests;

    return requests.filter((request) =>
      [
        request.title,
        request.ngoName,
        request.city,
        request.state,
        request.category,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [requests, searchTerm]);

  const removeRequest = (requestId) => {
    setRequests((current) => {
      const next = current.filter((request) => request.id !== requestId);
      writeRequests(next);
      return next;
    });
  };

  const handleAssign = async (request) => {
    if (!request?.issueId || !request?.ngoId) return;

    setActionId(request.id);
    setError("");

    try {
      await assignIssue({ iId: request.issueId, ngoId: request.ngoId });
      removeRequest(request.id);
    } catch (e) {
      console.log(e);
      setError("Could not assign this issue. It may already be assigned or not verified yet.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="mod-main">
      <header className="mod-header">
        <h1>Issue Requests</h1>
        <p>Review NGO interest requests and assign verified issues.</p>
      </header>

      <section className="mod-verify-toolbar">
        <div>
          <span>Requests</span>
          <strong>{filteredRequests.length}</strong>
        </div>
        <label className="mod-verify-search">
          <FaSearch />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search issue requests"
          />
        </label>
      </section>

      {error && (
        <div className="mod-verify-alert">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {filteredRequests.length > 0 ? (
        <section className="mod-verify-list">
          {filteredRequests.map((request) => {
            const busy = actionId === request.id;

            return (
              <article className="mod-verify-card" key={request.id}>
                <div className="mod-verify-icon">
                  <FaClipboardList />
                </div>

                <div
                  className="mod-verify-content"
                  onClick={() => navigate(`/issue-details/${request.issueId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      navigate(`/issue-details/${request.issueId}`);
                    }
                  }}
                >
                  <div className="mod-verify-title-row">
                    <div>
                      <h2>{request.title || "Untitled issue"}</h2>
                      <p>
                        <FaMapMarkerAlt />
                        {[request.city, request.state].filter(Boolean).join(", ") ||
                          "Location unavailable"}
                      </p>
                    </div>
                    <span className="mod-review-pill">INTERESTED</span>
                  </div>

                  <p className="mod-verify-description">
                    {request.description || "No description provided."}
                  </p>

                  <div className="mod-verify-meta">
                    <span>{request.ngoName || "NGO"}</span>
                    <span>{request.category || "General"}</span>
                    <span>{formatRequestDate(request.appliedAt)}</span>
                  </div>
                </div>

                <div className="mod-verify-actions">
                  <button
                    type="button"
                    className="mod-verify-accept"
                    disabled={busy}
                    onClick={() => handleAssign(request)}
                  >
                    <FaCheck />
                    Assign
                  </button>
                  <button
                    type="button"
                    className="mod-verify-reject"
                    disabled={busy}
                    onClick={() => removeRequest(request.id)}
                  >
                    <FaTimes />
                    Dismiss
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="mod-verify-state">
          <FaClipboardList />
          <strong>No issue requests</strong>
          <span>NGO interest requests will appear here after they click Show Interest.</span>
        </div>
      )}
    </div>
  );
}
