import '../../styles/Ngo.css'

import NgoIssues from '../../components/ngo/ngoIssues'
import NgoNav from '../../components/ngo/ngoNav'

export default function Ngo() {
    return (
        <main className="ngo-page">
            <NgoNav/>
            <NgoIssues/>
        </main>
    )
}
