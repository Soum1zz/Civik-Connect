import '../../styles/Citizen.css'
import MyNav from '../../components/myDash/myNav'
import MyIssues from '../../components/myDash/myIssue'
import MyProfile from '../../components/myDash/myProfile'
import { useState } from 'react'


export default function Citizen() {

    const [navActive, setNavActive]= useState("myIssues");

    return (
        <main className="citizen-page">
                <MyNav navActive={navActive} setNavActive={setNavActive}/>

                {
                    navActive==="myIssues" && 
                    <div>
                        <MyIssues />   
                    </div>
                }

                {
                    navActive==="myProfile" &&
                    <div >
                        <MyProfile/>   
                    </div>
                }
        </main>
    )
}
