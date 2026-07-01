import { FaCheckCircle, FaHome, FaListAlt, FaMapMarkerAlt, FaRegFileAlt, FaSignOutAlt, FaUpload, FaUser } from 'react-icons/fa'
import '../../styles/Issue.css'

export default function Issue() {
    return (
        <main className="issue-page">
            <aside className="issue-sidebar">
                <div className="dash-logo"><FaCheckCircle /> WeCare</div>
                <nav>
                    <a href="/citizen"><FaHome /> Dashboard</a>
                    <a className="active" href="/issue"><FaRegFileAlt /> Report Issue</a>
                    <a href="#my-issues"><FaListAlt /> My Issues</a>
                    <a href="#profile"><FaUser /> Profile</a>
                </nav>
                <a className="logout-link" href="/"><FaSignOutAlt /> Logout</a>
            </aside>

            <section className="issue-form-wrap">
                <form className="issue-form" onSubmit={(event) => event.preventDefault()}>
                    <div className="form-heading">
                        <h1>Report a New Issue</h1>
                        <p>Provide details about the issue</p>
                    </div>

                    <label>
                        Title
                        <input placeholder="Enter issue title" />
                    </label>

                    <label>
                        Description
                        <textarea placeholder="Describe the issue in detail" />
                    </label>

                    <label>
                        Category
                        <select defaultValue="">
                            <option value="" disabled>Select category</option>
                            <option>Animal Welfare</option>
                            <option>Cleanliness</option>
                            <option>Public Infrastructure</option>
                            <option>Water Supply</option>
                        </select>
                    </label>

                    <label>
                        Location
                        <div className="map-preview">
                            <div className="map-pin"><FaMapMarkerAlt /></div>
                        </div>
                    </label>

                    <label>
                        Address
                        <input placeholder="Enter address" />
                    </label>

                    <label>
                        Upload Images
                        <div className="upload-box">
                            <FaUpload />
                            <strong>Click or drag files to upload</strong>
                            <span>PNG, JPG up to 10MB</span>
                        </div>
                    </label>

                    <button type="submit">Submit Issue</button>
                </form>
            </section>
        </main>
    )
}
