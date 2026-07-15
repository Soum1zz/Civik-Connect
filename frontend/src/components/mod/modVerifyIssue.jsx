import { useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { nonverifiedIssue, rejectIssue, verifyIssue } from "../../api/modApi";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function getIssueId(issue) {
  return issue?.issueId || issue?.id;
}

function getIssueCategory(issue) {
  if (typeof issue?.category === "string") return issue.category;
  return issue?.category?.name || "General";
}

function formatIssueDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ModVerifyIssue({issues}) {
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()



  const filteredIssues = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return issues;

    return issues.filter((issue) => {
      const category = getIssueCategory(issue).toLowerCase();
      return (
        issue?.title?.toLowerCase().includes(query) ||
        issue?.city?.toLowerCase().includes(query) ||
        issue?.state?.toLowerCase().includes(query) ||
        category.includes(query)
      );
    });
  }, [issues, searchTerm]);

  const handleAction = async (issue, action) => {
    const issueId = getIssueId(issue);
    if (!issueId) return;

    setActionId(issueId);
    setError("");
    try {
      if (action === "verify") {
        await verifyIssue(issueId);
      } else {
        await rejectIssue(issueId);
      }
      setIssues((current) =>
        current.filter((item) => getIssueId(item) !== issueId),
      );
    } catch (e) {
      console.log(e);
      setError(`Could not ${action} this issue.`);
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="mod-main">
      <header className="mod-header">
        <h1>Verify Issues</h1>
        <p>Review all issues currently waiting under moderator review.</p>
      </header>

      <section className="mod-verify-toolbar">
        <div>
          <span>Under Review</span>
          <strong>{filteredIssues.length}</strong>
        </div>
        <label className="mod-verify-search">
          <FaSearch />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search pending issues"
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
          <span>Loading issues...</span>
        </div>
      ) : filteredIssues.length > 0 ? (
        <section className="mod-verify-list">
          {filteredIssues.map((issue) => {
            const issueId = getIssueId(issue);
            const busy = actionId === issueId;

            return (
              <article className="mod-verify-card" key={issueId}
              >
                <div className="mod-verify-icon">
                  <FaClipboardCheck />
                </div>

                <div className="mod-verify-content"
                              onClick={() => navigate(`/issue-details/${issueId}`)}
                  >
                  <div className="mod-verify-title-row">
                    <div>
                      <h2>{issue.title || "Untitled issue"}</h2>
                      <p>
                        <FaMapMarkerAlt />
                        {[issue.city, issue.state].filter(Boolean).join(", ") ||
                          "Location unavailable"}
                      </p>
                    </div>
                    <span className="mod-review-pill">
                      {(issue.status || "UNDER_REVIEW").replaceAll("_", " ")}
                    </span>
                  </div>

                  <p className="mod-verify-description">
                    {issue.description || "No description provided."}
                  </p>

                  <div className="mod-verify-meta">
                    <span>{getIssueCategory(issue)}</span>
                    <span>{formatIssueDate(issue.time || issue.createdOn)}</span>
                  </div>
                </div>

                <div className="mod-verify-actions">
                  <button
                    type="button"
                    className="mod-verify-accept"
                    disabled={busy}
                    onClick={() => handleAction(issue, "verify")}
                  >
                    <FaCheck />
                    Verify
                  </button>
                  <button
                    type="button"
                    className="mod-verify-reject"
                    disabled={busy}
                    onClick={() => handleAction(issue, "reject")}
                  >
                    <FaTimes />
                    Reject
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="mod-verify-state">
          <FaClipboardCheck />
          <strong>No issues under review</strong>
          <span>New citizen reports will appear here for verification.</span>
        </div>
      )}
    </div>
  );
}
