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
import { getUserName } from "../../api/userApi";
import Loader from "../../components/Loader/Loader";

const timeline = [
  { key: "reported", label: "Issue Reported", icon: FaClock },
  { key: "verified", label: "Verified by Moderator", icon: FaShield },
  { key: "interest", label: "NGO Showed Interest", icon: FaRegCircleCheck },
];

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

function getTimelineSteps(status = "") {
  const normalizedStatus = status.toUpperCase();
  const activeStepsByStatus = {
    OPEN: ["reported"],
    UNDER_REVIEW: ["reported"],
    VERIFIED: ["reported", "verified"],
    IN_PROGRESS: ["reported", "verified", "interest"],
    RESOLVED: ["reported", "verified", "interest"],
    COMPLETED: ["reported", "verified", "interest"],
    REJECTED: ["reported", "verified"],
  };
  const activeSteps = activeStepsByStatus[normalizedStatus] || ["reported"];

  return timeline.map((item) => ({
    ...item,
    state: activeSteps.includes(item.key) ? "active" : "upcoming",
  }));
}

function getInitial(name = "U") {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function formatLocation(issue) {
  return issue?.state;
}

function formatTime(value) {
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
  const [reporter, setReporter]= useState();

  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeImage, setActiveImage] = useState();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(Boolean(issueId));
  const [posting, setPosting] = useState(false);
  const [position, setPosition] = useState([22.5726, 88.3639])

  useEffect(() => {
    if (!issueId) return;

    let isMounted = true;

    const loadIssue = async () => {
      setLoading(true);
      try {
        const issueRes = await getIssueById(issueId);
        const issueData= issueRes.data;
        if (!isMounted) return;

        if (issueRes) {
          setIssue(issueData);
          setPosition([issueData.latitude, issueData.longitude]);

          const repRes = await getUserName(issueData?.uid);
          setReporter(repRes.data);

          const [imgRes, commentRes] = await Promise.allSettled([
            getIssueImages(issueData?.issueId),
            getIssueComments(issueData?.issueId),
          ]);

          if (!isMounted) return;

          if (imgRes.status === "fulfilled" && Array.isArray(imgRes.value.data)) {
            setImages(imgRes.value.data);
            setActiveImage(imgRes.value.data[0]);
          } else {
            setImages([]);
            setActiveImage();
          }

          if (commentRes.status === "fulfilled" && Array.isArray(commentRes.value.data)) {
            setComments(commentRes.value.data);
          } else {
            setComments([]);
          }
        }
      } catch (error) {
        console.error("Error loading issue:", error);
      } finally {
        if (isMounted) setLoading(false);
      }

      
    };

    loadIssue();

    return () => {
      isMounted = false;
    };
  }, [issueId]);



  const location = useMemo(() => formatLocation(issue), [issue]);
  const timelineSteps = useMemo(() => getTimelineSteps(issue?.status), [issue?.status]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    const targetIssueId = issue?.issueId || issueId;

    if (!trimmedMessage || !targetIssueId) return;

    setPosting(true);
    try {
      await createIssueComment({
        iId: Number(targetIssueId),
        message: trimmedMessage,
      });

      setComments((currentComments) => [
        ...(currentComments || []),
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

  if (loading) {
    return (
      <main className="issue-detail-page">
        <section className="issue-detail-loader">
          <Loader />
          <span>Loading issue details...</span>
        </section>
      </main>
    );
  }

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
              <h1>{issue?.title}</h1>
              <div className="issue-detail-meta">
                <span className="issue-reporter-avatar">
                  {getInitial(reporter)}
                </span>
                <span>
                  Reported by{" "}
                  {reporter }
                </span>
                <span>•</span>
                <span>{formatTime(issue?.time) || "Recently"}</span>
              </div>
            </div>
            <span className={`issue-status-pill ${getStatusClass(issue?.status)}`}>
              {formatStatus(issue?.status)}
            </span>
          </div>

          <div className="issue-detail-tags">
            <span>
              <FaLocationDot /> {location || "Location unavailable"}
            </span>
            <strong>{issue?.category || "General"}</strong>
          </div>

          <section className="issue-gallery" aria-label="Issue photos">
            {images.length > 0 ? (
              <>
                <div className="issue-main-photo">
                  <img src={activeImage} alt={issue?.title} />
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
              </>
            ) : (
              <div className="issue-empty-state issue-empty-gallery">
                <FaImage />
                <strong>No images available</strong>
                <p>This issue was reported without photos.</p>
              </div>
            )}
          </section>

          <section className="issue-copy-block">
            <h2>Description</h2>
            <p>{issue?.description}</p>
          </section>

          <section className="issue-copy-block">
            <h2>Location</h2>
            <div className="map-shell">
              <MapContainer center={position} zoom={4} scrollWheelZoom={false}>
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
              {timelineSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    className={`issue-timeline-item ${item.state}`}
                    key={item.label}
                  >
                    <span>
                      <Icon />
                    </span>
                    <div>
                      <strong>{item.label}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="issue-side-panel issue-comments-panel">
            <h2>Comments ({comments.length})</h2>
            {comments.length > 0 ? (
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
                        <time>{formatTime(comment.createdAt)}</time>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="issue-empty-state issue-empty-comments">
                <FaComment />
                <strong>No comments available</strong>
                <p>Be the first to add an update on this issue.</p>
              </div>
            )}
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
    </main>
  );
}
