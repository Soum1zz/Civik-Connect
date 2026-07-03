import '../../styles/Ngo.css'

import NgoIssues from '../../components/ngo/ngoIssues'
import NgoNav from '../../components/ngo/ngoNav'
import { useState } from 'react'
import NgoProfile from '../../components/ngo/ngoProfile'

export default function Ngo() {
    const [navActive, setNavActive]= useState("avIssues")
    return (
        <main className="ngo-page">
            <NgoNav navActive={navActive} setNavActive={setNavActive}/>
            {
                navActive==="avIssues"&&
            <NgoIssues/>
            }
            {/* {
                navActive==="ngoNav"&&
            <NgoIssues/>
            } */}
            {
                navActive==="ngoProf"&&
            <NgoProfile/>
            }

        </main>
    )
}
