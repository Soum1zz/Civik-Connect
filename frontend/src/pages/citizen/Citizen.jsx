import { FaBell, FaCheckCircle, FaClock, FaExclamationCircle, FaHome, FaListAlt, FaPlus, FaRegFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import '../../styles/Citizen.css'

const activity = [
    { title: 'Street Light repaired near Park Street', status: 'open', time: '2 hours ago' },
    { title: 'Garbage not collected in my area', status: 'completed', time: '1 day ago' },
    { title: 'Water Leakage in Pipeline', status: 'rejected', time: '3 days ago' },
]

export default function Citizen() {
    return (
        <main className="citizen-page">
            <aside className="citizen-sidebar">
                <div className="dash-logo"><FaCheckCircle /> WeCare</div>
                <nav>
                    <a className="active" href="/citizen"><FaHome /> Dashboard</a>
                    <a href="/issue"><FaRegFileAlt /> Report Issue</a>
                    <a href="#issues"><FaListAlt /> My Issues</a>
                    <a href="#profile"><FaUser /> Profile</a>
                </nav>
                <a className="logout-link" href="/"><FaSignOutAlt /> Logout</a>
            </aside>

            <section className="citizen-main">
                <header className="citizen-header">
                    <div>
                        <h1>Welcome Back</h1>
                        <p>Here's what's happening in your area.</p>
                    </div>
                    <div className="citizen-user">
                        <FaBell />
                        <span>Hello, Soumya</span>
                        <div className="avatar">S</div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <section className="quick-card">
                        <h2>Quick Action</h2>
                        <a className="report-action" href="/issue"><FaPlus /> Report an Issue</a>
                    </section>

                    <section className="overview-card">
                        <h2>My Issues Overview</h2>
                        <div className="status-metrics">
                            <div><strong>12</strong><span>Open</span></div>
                            <div><strong>8</strong><span>Completed</span></div>
                            <div><strong>2</strong><span>Rejected</span></div>
                        </div>
                    </section>
                </div>

                <section className="activity-card">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        {activity.map((item) => (
                            <article key={item.title}>
                                <div className={`activity-icon ${item.status}`}>
                                    {item.status === 'completed' ? <FaCheckCircle /> : item.status === 'rejected' ? <FaExclamationCircle /> : <FaClock />}
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                </div>
                                <span className={`issue-chip ${item.status}`}>{item.status}</span>
                                <time>{item.time}</time>
                            </article>
                        ))}
                    </div>
                    <a className="view-all" href="#issues">View All My Issues</a>
                </section>
            </section>
        </main>
    )
}
