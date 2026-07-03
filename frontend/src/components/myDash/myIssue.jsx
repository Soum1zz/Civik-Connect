import '../../styles/Citizen.css'
import { FaPlus } from 'react-icons/fa';

export default function myIssues() {
  return (
    <div className="citizen-main">
        <header className="citizen-header">
          <div>
            <h1>Welcome Back</h1>
          </div>
          <div className="citizen-user">
            <span>Hello, Soumya</span>
            <div className="avatar">S</div>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="quick-card">
            <h2>Let Us Solve Your Problems</h2>
            <a className="report-action" href="/issue">
              <FaPlus /> Report an Issue
            </a>
          </section>

          <section className="overview-card">
            <h2>My Issues Overview</h2>
            <div className="status-metrics">
              <div>
                <strong>12</strong>
                <span>Open</span>
              </div>
              <div>
                <strong>8</strong>
                <span>Completed</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Rejected</span>
              </div>
            </div>
          </section>
        </div>

        {/* <section className="activity-card">
          <h2>Your Issues</h2>
          <div className="activity-list">
            {activity.map((item) => (
              <article key={item.title}>
                <div className={`activity-icon ${item.status}`}>
                  {item.status === "completed" ? (
                    <FaCheckCircle />
                  ) : item.status === "rejected" ? (
                    <FaExclamationCircle />
                  ) : (
                    <FaClock />
                  )}
                </div>
                <div>
                  <h3>{item.title}</h3>
                </div>
                <span className={`issue-chip ${item.status}`}>
                  {item.status}
                </span>
                <time>{item.time}</time>
              </article>
            ))}
          </div>
          <a className="view-all" href="#issues">
            View All My Issues
          </a>
        </section> */}
    </div>
  );
}
