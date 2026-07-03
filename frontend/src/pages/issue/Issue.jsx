import { FaCheckCircle, FaHome, FaListAlt, FaMapMarkerAlt, FaRegFileAlt, FaSignOutAlt, FaUpload, FaUser } from 'react-icons/fa'
import '../../styles/Issue.css'

export default function Issue() {
    return (
        <main className="issue-page">
            

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
                            <strong>Click to upload</strong>
                            <span>PNG, JPG up to 10MB</span>
                        </div>
                    </label>

                    <button type="submit">Submit Issue</button>
                </form>
            </section>
        </main>
    )
}
