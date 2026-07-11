import '../../styles/Ngo.css'

import NgoIssues from '../../components/ngo/ngoIssues'
import NgoNav from '../../components/ngo/ngoNav'
import { useEffect, useState } from 'react'
import NgoProfile from '../../components/ngo/ngoProfile'
import { getmyngo } from '../../api/ngoApi'

export default function Ngo() {

    const [myNgo, setMyNgo] = useState()

    useEffect(()=>{

            async function getngo(){
                    try{
                        const res= await getmyngo();
                        setMyNgo(res.data)
                        console.log(myNgo)
                }catch(e){
                    console.log(e);
                }
            }
            getngo();
    },[])

    const [navActive, setNavActive]= useState("avIssues")
    return (
        <main className="ngo-page">
            <NgoNav navActive={navActive} setNavActive={setNavActive} myNgo={myNgo}/>
            {
                navActive==="avIssues"&&
            <NgoIssues myNgo={myNgo}/>
            }
            {/* {
                navActive==="ngoNav"&&
            <NgoIssues/>
            } */}
            {
                navActive==="ngoProf"&& 
            <NgoProfile myNgo={myNgo}/>
            }

        </main>
    )
}
