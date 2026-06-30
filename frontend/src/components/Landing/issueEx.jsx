
import reportImg from 'C:/civikConnect/frontend/src/assets/report-img.png'
import reviewImg from 'C:/civikConnect/frontend/src/assets/review-img.png'
import assignImg from 'C:/civikConnect/frontend/src/assets/assign-img.png'
import resolveImg from 'C:/civikConnect/frontend/src/assets/resolve-img.png'

export default function IssueEx() {
    return (
        <section className="process-section" id="how-it-works">
            <div className="section-eyebrow">HOW IT WORKS</div>
            <div className="abt-header">
                Simple Steps, Big Impact
            </div>

            <div className="steps-div">
                <div className="steps-sub">
                    <img src={reportImg}/>

                    <div>
                        <div className="sub-header">1. Report</div>
                        <p>Report an issue in your area with deatails and photos</p>
                    </div>
                </div>
                <div className="steps-sub">
                    <img src={reviewImg}/>

                    <div>
                        <div className="sub-header">2. Review</div>
                        <p>Moderators review and verify the reported issue</p>
                    </div>

                </div>
                <div className="steps-sub">
                    <img src={assignImg}/>

                    <div>
                        <div className="sub-header">3. Assign</div>
                        <p>Your issue is assigned to the right NGO for action</p>
                    </div>

                </div>
                <div className="steps-sub">
                    <img src={resolveImg}/>

                    <div>
                        <div className="sub-header">4. Resolve</div>
                        <p>NGO resolves the issue and updates the status</p>
                    </div>

                </div>


            </div>

            <div className="issuesex-div">
                {/* will work on it later dont touch it for now */}

            </div>
        </section>
    )
}
