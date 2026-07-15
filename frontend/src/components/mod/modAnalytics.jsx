import {
  FaChartBar,
  FaClipboardCheck,
  FaClipboardList,
  FaHome,
  FaRegEye,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

export default function modAnalytics({issues, ngos, requests}) {
  return (
    <div className="mod-main">
      <header className="mod-header">
        <h1>Site Analytics</h1>
        <p>Overview of all activities.</p>
      </header>

      <section className="mod-stats" aria-label="Moderator overview">
          <article >
            <span>Pending NGO verifications</span>
            <strong>{ngos.length}</strong>
          </article>
          <article >
            <span>Pending Issue verifications</span>
            <strong>{issues.length}</strong>
          </article>
          <article >
            <span>Pending assignment requests</span>
            <strong>{requests.length}</strong>
          </article>
      </section>

    </div>
  );
}
