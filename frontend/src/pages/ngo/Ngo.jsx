import { FaBell, FaCheckCircle, FaClipboardList, FaHome, FaListAlt, FaSearch, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa'
import '../../styles/Ngo.css'

const issues = [
    { title: 'Injured Dog on Road', place: 'Park Street, Kolkata', type: 'Animal Welfare', time: '2 hours ago' },
    { title: 'Elderly Need Medical Help', place: 'Howrah, West Bengal', type: 'Healthcare', time: '3 hours ago' },
    { title: 'Garbage Overflowing', place: 'Garia, Kolkata', type: 'Cleanliness', time: '5 hours ago' },
]

export default function Ngo() {
    return (
        <main className="ngo-page">
            <aside className="ngo-sidebar">
                <div className="dash-logo"><FaCheckCircle /> WeCare</div>
                <div className="ngo-profile">
                    <div className="ngo-avatar">HH</div>
                    <strong>Helping Hands</strong>
                    <span>NGO Dashboard</span>
                </div>
                <nav>
                    <a href="/citizen"><FaHome /> Dashboard</a>
                    <a className="active" href="/ngo"><FaListAlt /> Available Issues</a>
                    <a href="#assigned"><FaClipboardList /> My Issues</a>
                    <a href="#profile"><FaUser /> Profile</a>
                </nav>
                <a className="logout-link" href="/"><FaSignOutAlt /> Logout</a>
            </aside>

            <section className="ngo-main">
                <header className="ngo-topbar">
                    <span>Hello, Helping Hands</span>
                    <FaBell />
                </header>

                <section className="available-card">
                    <div className="ngo-title-row">
                        <div>
                            <h1>Available Issues</h1>
                            <p>List of issues that need help</p>
                        </div>
                    </div>

                    <div className="issue-filters">
                        <label>
                            Category
                            <select defaultValue="All Categories">
                                <option>All Categories</option>
                                <option>Animal Welfare</option>
                                <option>Healthcare</option>
                                <option>Cleanliness</option>
                            </select>
                        </label>
                        <label>
                            State
                            <select defaultValue="All Status">
                                <option>All Status</option>
                                <option>Open</option>
                                <option>Assigned</option>
                            </select>
                        </label>
                        <label>
                            Search
                            <div className="ngo-search"><input placeholder="Search issues..." /><FaSearch /></div>
                        </label>
                    </div>

                    <div className="ngo-issues">
                        {issues.map((item) => (
                            <article key={item.title}>
                                <div className="issue-thumb"><FaUsers /></div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.place}</p>
                                    <strong>{item.type}</strong>
                                </div>
                                <time>{item.time}</time>
                                <button>Show Interest</button>
                            </article>
                        ))}
                    </div>

                    <div className="ngo-pagination">
                        <button className="active">1</button>
                        <button>2</button>
                        <button>Next</button>
                    </div>
                </section>
            </section>
        </main>
    )
}
