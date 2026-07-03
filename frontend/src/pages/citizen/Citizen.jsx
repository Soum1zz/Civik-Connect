import '../../styles/Citizen.css'
import MyNav from '../../components/myDash/myNav'
import MyIssues from '../../components/myDash/myIssue'


export default function Citizen() {
    return (
        <main className="citizen-page">
                <MyNav/>
                <MyIssues/>
        </main>
    )
}
