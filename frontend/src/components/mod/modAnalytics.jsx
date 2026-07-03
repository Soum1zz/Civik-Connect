import {
  FaChartBar,
  FaClipboardCheck,
  FaClipboardList,
  FaHome,
  FaRegEye,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const stats = [
  { label: "Pending Issues", value: "18" },
  { label: "Pending NGOs", value: "7" },
  { label: "Awaiting Assignment", value: "12" },
  { label: "Awaiting Closure", value: "24" },
];
export default function modAnalytics() {
  return (
    <div className="mod-main">
      <header className="mod-header">
        <h1>Site Analytics</h1>
        <p>Overview of all activities.</p>
      </header>

      <section className="mod-stats" aria-label="Moderator overview">
        {stats.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

    </div>
  );
}
