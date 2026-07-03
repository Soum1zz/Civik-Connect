import '../../styles/Mod.css'
import ModAnalytics from '../../components/mod/modAnalytics'
import ModNav from '../../components/mod/modNav'


export default function Mod() {
    return (
        <main className="mod-page">
            <ModNav/>
            <ModAnalytics/>     
        </main>
    )
}
