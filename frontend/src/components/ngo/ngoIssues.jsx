import { FaBell, FaCheckCircle, FaClipboardList, FaHome, FaListAlt, FaSearch, FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa'

export default function ngoIssues() {
  return (
    <div>
      <section className="ngo-main">
        <header className="ngo-topbar">
          <span>Hello, Helping Hands</span>
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
              <div className="ngo-search">
                <input placeholder="Search issues..." />
                <FaSearch />
              </div>
            </label>
          </div>
        </section>
      </section>
    </div>
  );
}
