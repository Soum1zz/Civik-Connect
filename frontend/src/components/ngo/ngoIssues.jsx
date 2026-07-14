import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaLeaf,
  FaMapMarkerAlt,
  FaRegHandPointer,
  FaSearch,
} from "react-icons/fa";
import { getIssuesByState, ngoShowInt } from "../../api/ngoApi";
import Loader from "../Loader/Loader";
import { getAllCategories } from "../../api/issueApi";

const statusClassMap = {
  OPEN: "open",
  UNDER_REVIEW: "review",
  VERIFIED: "verified",
  IN_PROGRESS: "progress",
  RESOLVED: "completed",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

function getStatusClass(status = "") {
  return statusClassMap[status.toUpperCase()] || "open";
}

function formatStatus(status = "OPEN") {
  return status.replaceAll("_", " ");
}

function formatIssueTime(value) {
  if (!value) return "Recently";

  const createdDate = new Date(value);
  if (Number.isNaN(createdDate.getTime())) return value;

  const diffDays = Math.max(
    0,
    Math.floor((Date.now() - createdDate.getTime()) / 86400000),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function NgoIssues({ myNgo }) {
  const navigate = useNavigate();
  const ngoState = myNgo?.state || myNgo?.State;
  const [issues, setIssues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestVersion, setRequestVersion] = useState(0);
  const [actionIssueId, setActionIssueId] = useState(null);
  const [message, setMessage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    let isMounted = true;

    const loadCats = async () => {
      try {
        const cats = await getAllCategories();
        if (isMounted) setCategories(Array.isArray(cats.data) ? cats.data : []);
      } catch (e) {
        console.log(e);
      }
    };

    loadCats();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ngoState) return;

    let isMounted = true;

    const loadIssues = async () => {
      setLoading(true);
      try {
        const res = await getIssuesByState(ngoState);
        console.log(res)
        if (isMounted) {
          setIssues(Array.isArray(res.data) ? res.data : []);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) setIssues([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadIssues();
    return () => {
      isMounted = false;
    };
  }, [ngoState]);

  const interestIssueIds = useMemo(() => {
    if (!myNgo?.ngoId) return [];
    try {
      const requests = JSON.parse(localStorage.getItem("ngoIssueRequests") || "[]");
      return requests
        .filter((request) => request.ngoId === myNgo.ngoId)
        .map((request) => request.issueId);
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [myNgo?.ngoId, requestVersion]);



  const handleShowInterest = async (event, issue) => {
    event.stopPropagation();
    const issueId = issue?.issueId;

    if (!issueId || !myNgo?.ngoId || interestIssueIds.includes(issueId)) return;

    setActionIssueId(issueId);
    setMessage("");

    try {
      console.log(localStorage.getItem("token"))
      await ngoShowInt(issueId);
      setMessage("Interest sent to moderator.");
    } catch (e) {
      console.log(e);
    } finally {
      setActionIssueId(null);
    }
  };

  const filteredIssues = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return issues.filter((issue) => {
      const matchesCategory =
        categoryFilter === "All Categories" ||
        issue.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All Status" || issue.status === statusFilter;
      const matchesSearch =
        !query ||
        issue.title?.toLowerCase().includes(query) ||
        issue.city?.toLowerCase().includes(query) ||
        issue.category?.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [categoryFilter, issues, searchTerm, statusFilter]);

  return (
    <section className="ngo-main">
      <header className="ngo-topbar">
        <span>Hello, {myNgo?.name || "NGO"}</span>
      </header>

      <section className="available-card">
        <div className="ngo-title-row">
          <div>
            <h1>Available Issues</h1>
            <p>
              {ngoState
                ? `Issues available in ${ngoState}`
                : "Loading your service area"}
            </p>
          </div>
        </div>

        <div className="issue-filters">
          <label>
            Category
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option>All Categories</option>
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Status</option>
              <option>UNDER_REVIEW</option>
              <option>VERIFIED</option>
              <option>IN_PROGRESS</option>
              <option>RESOLVED</option>
              <option>REJECTED</option>
            </select>
          </label>
          <label>
            Search
            <div className="ngo-search">
              <input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <FaSearch />
            </div>
          </label>
        </div>

        {message && <div className="ngo-action-message">{message}</div>}

        {loading ? (
          <div className="ngo-list-state">
            <Loader />
            <span>Loading issues...</span>
          </div>
        ) : filteredIssues.length > 0 ? (
          <div className="ngo-issues">
            {filteredIssues.map((issue) => (
              <article
                key={issue.issueId}
                onClick={() => navigate(`/issue-details/${issue.issueId}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    navigate(`/issue-details/${issue.issueId}`);
                  }
                }}
              >
                <div className={`issue-thumb ${getStatusClass(issue.status)}`}>
                  <FaLeaf />
                </div>
                <div>
                  <h2>{issue.title}</h2>
                  <p>
                    <FaMapMarkerAlt />{" "}
                    {[issue.city, issue.state].filter(Boolean).join(", ")}
                  </p>
                  <strong>{issue.category}</strong>
                </div>
                <span
                  className={`ngo-issue-status ${getStatusClass(issue.status)}`}
                >
                  {formatStatus(issue.status)}
                </span>
                <time>{formatIssueTime(issue.time)}</time>
                {
                  issue.status === "VERIFIED" &&
                  <button
                  type="button"
                  className="ngo-interest-btn"
                  disabled={
                    actionIssueId === issue.issueId ||
                    interestIssueIds.includes(issue.issueId)
                  }
                  onClick={(event) => handleShowInterest(event, issue)}
                >
                  {interestIssueIds.includes(issue.issueId)
                    ? "Interested"
                    : actionIssueId === issue.issueId
                      ? "Sending..."
                      : "Show Interest"}
                </button>}
              </article>
            ))}
          </div>
        ) : (
          <div className="ngo-list-state">
            <FaClipboardList />
            <strong>No issues available</strong>
            <span>
              No matching issues were found in {ngoState || "your state"}.
            </span>
          </div>
        )}
      </section>
    </section>
  );
}
