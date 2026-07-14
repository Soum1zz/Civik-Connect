import '../../styles/Mod.css'
import ModAnalytics from '../../components/mod/modAnalytics'
import ModNgoVerify from '../../components/mod/modNgoVerify'
import ModNav from '../../components/mod/modNav'
import ModProfile from '../../components/mod/modProfile'
import ModVerifyIssue from '../../components/mod/modVerifyIssue'
import ModIssueReq from '../../components/mod/modIssueReq'

import { useEffect, useState } from 'react'
import { me } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../authService/authService'

export default function Mod() {
    const [navActive, setNavActive]= useState("modAna")
    const [myMod, setMyMod]= useState(null)
    const navigate = useNavigate()
    const role = getCurrentUser().role
    useEffect(()=>{
        async function getMod(){
            try{
                const res= await me();
                setMyMod(res.data)
            }catch(e){
                console.log(e);
            }
        }
        getMod();
    },[])
    if(role !== "MODERATOR"){
      navigate("/")
      return;
    }
    return (
        <main className="mod-page">

            <ModNav navActive={navActive} setNavActive={setNavActive}/>
            {
             navActive==="modAna"&&
                <ModAnalytics myMod={myMod}/>
            }
            {
                navActive==="modVeri"&&
                <ModVerifyIssue/>
            }
            {
                navActive==="modnreq"&&
                <ModNgoVerify/>
            }
            {
                navActive==="modireq"&&
                <ModIssueReq/>
            }
            {
                navActive==="modProf"&&
                <ModProfile myMod={myMod}/>
            }

        </main>
    )
}
