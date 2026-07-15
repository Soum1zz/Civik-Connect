import '../../styles/Ngo.css'

import NgoIssues from '../../components/ngo/ngoIssues'
import NgoNav from '../../components/ngo/ngoNav'
import { useEffect, useState } from 'react'
import NgoProfile from '../../components/ngo/ngoProfile'
import NgoMyIssues from '../../components/ngo/ngoMyIssues'
import { getmyngo, getNgoInt } from '../../api/ngoApi'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../authService/authService'

export default function Ngo() {
    const [ngoIntIds, setNgoIntIds]= useState([])
    const [myNgo, setMyNgo] = useState()
    const navigate = useNavigate();
    const role = getCurrentUser().role;
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
      useEffect(()=>{
            async function getIntIds() {
            try{
                const res= await getNgoInt();
                setNgoIntIds(res.data);
                console.log(res.data);
            }catch(e){
                console.log(e)
            }
        }
        getIntIds();
    
      },[])

    const [navActive, setNavActive]= useState("avIssues")

    if(role !== "NGO"){
      navigate("/")
      return;
    }
    return (
        <main className="ngo-page">
            <NgoNav navActive={navActive} setNavActive={setNavActive} myNgo={myNgo}/>
            {
                navActive==="avIssues"&&
            <NgoIssues myNgo={myNgo} ngoIntIds={ngoIntIds}/>
            }
            {
                navActive==="myIssues"&&
            <NgoMyIssues myNgo={myNgo} ngoIntIds={ngoIntIds}/>
            }
            {
                navActive==="ngoProf"&& 
            <NgoProfile myNgo={myNgo}/>
            }

        </main>
    )
}
