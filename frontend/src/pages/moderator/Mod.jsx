import '../../styles/Mod.css'
import ModAnalytics from '../../components/mod/modAnalytics'
import ModNav from '../../components/mod/modNav'
import ModProfile from '../../components/mod/modProfile'

import { useState } from 'react'

export default function Mod() {
    const [navActive, setNavActive]= useState("modAna")

    return (
        <main className="mod-page">

            <ModNav navActive={navActive} setNavActive={setNavActive}/>
            {
             navActive==="modAna"&&
                <ModAnalytics/>     
            }
            {
                navActive==="modProf"&&
                <ModProfile/>
            }

        </main>
    )
}
