
import Hero from "../../components/Landing/hero"
import IssueEx from "../../components/Landing/issueEx"
import ContactUs from "../../components/Landing/contactUs"
import "../../styles/Landing.css"

export default function Landing() {
    return (
        <main className="landing-page">
            <Hero />
            <IssueEx />
            <ContactUs />
        </main>
    )
}
