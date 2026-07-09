import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaComment,
  FaImage,
  FaLocationDot,
  FaPaperPlane,
  FaRegCircleCheck,
  FaShield,
  FaUser,
} from "react-icons/fa6";
import "../../styles/Issue.css";
import {
  createIssueComment,
  getIssueById,
  getIssueComments,
  getIssueImages,
} from "../../api/issueApi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const timeline = [
  { label: "Issue Reported", time: "2 hours ago", icon: FaClock },
  { label: "Verified by Moderator", time: "1 hour ago", icon: FaShield },
  { label: "NGO Showed Interest", time: "45 mins ago", icon: FaRegCircleCheck },
];

function getInitial(name = "U") {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function formatLocation(issue) {
  return [issue.city, issue.state].filter(Boolean).join(", ");
}

function formatCommentTime(value) {
  if (!value || value.includes("ago")) return value || "Just now";

  const createdAt = new Date(value);
  if (Number.isNaN(createdAt.getTime())) return "Just now";

  const minutes = Math.max(
    1,
    Math.floor((Date.now() - createdAt.getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes} mins ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  return `${Math.floor(hours / 24)} days ago`;
}

export default function IssueDetails() {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState();
  const [images, setImages] = useState();
  const [comments, setComments] = useState();
  const [activeImage, setActiveImage] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(Boolean(issueId));
  const [posting, setPosting] = useState(false);
  const [position, setPosition] = useState([])

  useEffect(() => {
    if (!issueId) return;

    let isMounted = true;

    const loadIssue = async () => {
      setLoading(true);
      try {
        const [issueRes, imageRes, commentRes] = await Promise.allSettled([
          getIssueById(issueId),
          getIssueImages(issueId),
          getIssueComments(issueId),
        ]);

        if (!isMounted) return;

        if (issueRes.status === "fulfilled") {
          setIssue({ ...fallbackIssue, ...issueRes.value.data });
        }

        if (imageRes.status === "fulfilled" && imageRes.value.data?.length) {
          setImages(imageRes.value.data);
          setActiveImage(imageRes.value.data[0]);
        }

        if (
          commentRes.status === "fulfilled" &&
          Array.isArray(commentRes.value.data)
        ) {
          setComments(commentRes.value.data);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadIssue();

    return () => {
      isMounted = false;
    };
  }, [issueId]);

  useEffect(() => {
    setActiveImage(images[0] || fallbackImages[0]);
  }, [images]);

  const location = useMemo(() => formatLocation(issue), [issue]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    const targetIssueId = issue.issueId || issueId;

    if (!trimmedMessage || !targetIssueId) return;

    setPosting(true);
    try {
      await createIssueComment({
        iId: Number(targetIssueId),
        message: trimmedMessage,
      });

      setComments((currentComments) => [
        ...currentComments,
        {
          id: `local-${Date.now()}`,
          author: { name: "You" },
          message: trimmedMessage,
          createdAt: "Just now",
        },
      ]);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <main className="issue-detail-page">
      <section className="issue-detail-shell">
        <div className="issue-detail-content">
          <button
            className="issue-detail-back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>

          <div className="issue-detail-title-row">
            <div>
              <h1>{issue.title}</h1>
              <div className="issue-detail-meta">
                <span className="issue-reporter-avatar">
                  {getInitial(issue.reporter)}
                </span>
                <span>
                  Reported by{" "}
                  {issue.reporter || `User #${issue.uid || "Unknown"}`}
                </span>
                <span>•</span>
                <span>{issue.reportedAgo || "Recently"}</span>
              </div>
            </div>
            <span className="issue-status-pill">{issue.status || "OPEN"}</span>
          </div>

          <div className="issue-detail-tags">
            <span>
              <FaLocationDot /> {location || "Location unavailable"}
            </span>
            <strong>{issue.category || "General"}</strong>
          </div>

          <section className="issue-gallery" aria-label="Issue photos">
            <div className="issue-main-photo">
              {activeImage ? (
                <img src={activeImage} alt={issue.title} />
              ) : (
                <FaImage />
              )}
            </div>
            <div className="issue-thumb-list">
              {images.map((imageUrl, index) => (
                <button
                  className={activeImage === imageUrl ? "active" : ""}
                  key={`${imageUrl}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(imageUrl)}
                  aria-label={`Show issue photo ${index + 1}`}
                >
                  <img src={imageUrl} alt="" />
                </button>
              ))}
            </div>
          </section>

          <section className="issue-copy-block">
            <h2>Description</h2>
            <p>{issue.description}</p>
          </section>

          <section className="issue-copy-block">
            <h2>Location</h2>
            <div className="map-shell">
              <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={position}
                />
              </MapContainer>
            </div>
          </section>
        </div>

        <aside className="issue-detail-sidebar">
          <section className="issue-side-panel">
            <h2>Timeline</h2>
            <div className="issue-timeline">
              {timeline.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="issue-timeline-item" key={item.label}>
                    <span>
                      <Icon />
                    </span>
                    <div>
                      <strong>{item.label}</strong>
                      <time>{item.time}</time>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="issue-side-panel issue-comments-panel">
            <h2>Comments ({comments.length})</h2>
            <div className="issue-comments-list">
              {comments.map((comment) => {
                const authorName =
                  comment.author?.name || comment.author?.username || "User";
                return (
                  <article
                    className="issue-comment"
                    key={comment.id || comment.createdAt}
                  >
                    <span className="issue-comment-avatar">
                      {getInitial(authorName) || <FaUser />}
                    </span>
                    <div>
                      <strong>{authorName}</strong>
                      <p>{comment.message}</p>
                      <time>{formatCommentTime(comment.createdAt)}</time>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </aside>

        <form className="issue-comment-form" onSubmit={handleCommentSubmit}>
          <label>
            <FaComment />
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a comment..."
            />
          </label>
          <button type="submit" disabled={posting || !message.trim()}>
            {posting ? <FaCheck /> : <FaPaperPlane />}
            Post
          </button>
        </form>
      </section>
      {loading && (
        <span className="issue-detail-loading">Loading issue details...</span>
      )}
    </main>
  );
}
