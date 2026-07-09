import '../../styles/Citizen.css'
import MyNav from '../../components/myDash/myNav'
import MyIssues from '../../components/myDash/myIssue'
import MyProfile from '../../components/myDash/myProfile'
import { useEffect, useState } from 'react'
import { me } from "../../api/authApi";


export default function Citizen() {
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        async function getme() {
          try {
            const res = await me();
            setUser(res.data)
          } catch (e) {
            console.log(e);
          }
        }
        getme();
      }, []);

    const [navActive, setNavActive]= useState("myIssues");

    return (
        <main className="citizen-page">
                <MyNav navActive={navActive} setNavActive={setNavActive}/>

                {
                    navActive==="myIssues" && 
                    <div>
                        <MyIssues 
                        user={user}
                        />   
                    </div>
                }

                {
                    navActive==="myProfile" &&
                    <div >
                        <MyProfile
                        user={user}
                        />   
                    </div>
                }
        </main>
    )
}
