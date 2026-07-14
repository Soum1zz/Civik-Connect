import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaLeaf,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import { ngoIssues } from "../../api/ngoApi";
import Loader from "../Loader/Loader";

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

function getLocalRequests(ngoId) {
  try {
    const requests = JSON.parse(localStorage.getItem("ngoIssueRequests") || "[]");
    return requests.filter((request) => request.ngoId === ngoId);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default function NgoMyIssues({ myNgo }) {
  const navigate = useNavigate();
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [interestRequests, setInterestRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ngoId = myNgo?.ngoId;

  useEffect(() => {
    if (!ngoId) return;

    let isMounted = true;

    const loadMyIssues = async () => {
      setLoading(true);
      setInterestRequests(getLocalRequests(ngoId));

      try {
        const res = await ngoIssues(ngoId);
        if (isMounted) {
          setAssignedIssues(Array.isArray(res.data) ? res.data : []);
        }
      } catch (e) {
        console.log(e);
        if (isMounted) setAssignedIssues([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMyIssues();

    return () => {
      isMounted = false;
    };
  }, [ngoId]);

  const visibleAssigned = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return assignedIssues;

    return assignedIssues.filter((issue) =>
      [issue.title, issue.city, issue.state, issue.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [assignedIssues, searchTerm]);

  const visibleRequests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return interestRequests;

    return interestRequests.filter((issue) =>
      [issue.title, issue.city, issue.state, issue.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [interestRequests, searchTerm]);

  return (
    <section className="ngo-main">
      <header className="ngo-topbar">
        <span>My work, {myNgo?.name || "NGO"}</span>
      </header>

      <section className="available-card">
        <div className="ngo-title-row ngo-title-row-split">
          <div>
            <h1>My Issues</h1>
            <p>Track issue requests you showed interest in and work assigned to you.</p>
          </div>
          <label className="ngo-search ngo-my-search">
            <input
              placeholder="Search my issues..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <FaSearch />
          </label>
        </div>

        {loading ? (
          <div className="ngo-list-state">
            <Loader />
            <span>Loading your issues...</span>
          </div>
        ) : (
          <>
            <div className="ngo-section-heading">
              <strong>Pending Interest Requests</strong>
              <span>{visibleRequests.length}</span>
            </div>

            {visibleRequests.length > 0 ? (
              <div className="ngo-issues ngo-my-issue-list">
                {visibleRequests.map((issue) => (
                  <article
                    key={issue.id}
                    onClick={() => navigate(`/issue-details/${issue.issueId}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") navigate(`/issue-details/${issue.issueId}`);
                    }}
                  >
                    <div className="issue-thumb verified">
                      <FaLeaf />
                    </div>
                    <div>
                      <h2>{issue.title || "Untitled issue"}</h2>
                      <p>
                        <FaMapMarkerAlt />{" "}
                        {[issue.city, issue.state].filter(Boolean).join(", ") ||
                          "Location unavailable"}
                      </p>
                      <strong>{issue.category || "General"}</strong>
                    </div>
                    <span className="ngo-issue-status review">Requested</span>
                    <time>{formatIssueDate(issue.appliedAt)}</time>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ngo-list-state compact">
                <FaClipboardList />
                <strong>No pending requests</strong>
                <span>Issues you show interest in will appear here.</span>
              </div>
            )}

            <div className="ngo-section-heading">
              <strong>Assigned Issues</strong>
              <span>{visibleAssigned.length}</span>
            </div>

            {visibleAssigned.length > 0 ? (
              <div className="ngo-issues ngo-my-issue-list">
                {visibleAssigned.map((issue) => (
                  <article
                    key={issue.issueId}
                    onClick={() => navigate(`/issue-details/${issue.issueId}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") navigate(`/issue-details/${issue.issueId}`);
                    }}
                  >
                    <div className="issue-thumb progress">
                      <FaLeaf />
                    </div>
                    <div>
                      <h2>{issue.title || "Untitled issue"}</h2>
                      <p>
                        <FaMapMarkerAlt />{" "}
                        {[issue.city, issue.state].filter(Boolean).join(", ") ||
                          "Location unavailable"}
                      </p>
                      <strong>{issue.category || "General"}</strong>
                    </div>
                    <span className="ngo-issue-status progress">
                      {(issue.status || "ASSIGNED").replaceAll("_", " ")}
                    </span>
                    <time>{formatIssueDate(issue.time)}</time>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ngo-list-state compact">
                <FaClipboardList />
                <strong>No assigned issues</strong>
                <span>Approved moderator assignments will appear here.</span>
              </div>
            )}
          </>
        )}
      </section>
    </section>
  );
}
