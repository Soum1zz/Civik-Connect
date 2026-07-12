import '../../styles/Citizen.css'
import MyNav from '../../components/myDash/myNav'
import MyIssues from '../../components/myDash/myIssue'
import MyProfile from '../../components/myDash/myProfile'
import { useEffect, useState } from 'react'
import { me } from "../../api/authApi";
import { getCurrentUser } from '../../authService/authService'
import { useNavigate } from 'react-router-dom'


export default function Citizen() {
      const [user, setUser] = useState(null);
      const role = getCurrentUser().role;
      const navigate = useNavigate()

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
    
    if(role !== "REGULAR"){
      navigate("/")
      return;
    }
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
