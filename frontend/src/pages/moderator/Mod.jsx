import "../../styles/Mod.css";
import ModAnalytics from "../../components/mod/modAnalytics";
import ModNgoVerify from "../../components/mod/modNgoVerify";
import ModNav from "../../components/mod/modNav";
import ModProfile from "../../components/mod/modProfile";
import ModVerifyIssue from "../../components/mod/modVerifyIssue";
import ModIssueReq from "../../components/mod/modIssueReq";

import { useEffect, useState } from "react";
import { me } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../authService/authService";
import { getAllReq, nonverifiedIssue, nonverifiedNgo } from "../../api/modApi";

export default function Mod() {
  const [ngos, setNgos] = useState([]);
  const [requests, setRequests] = useState([]);
  const [issues, setIssues] = useState([]);

  const [navActive, setNavActive] = useState("modAna");
  const [myMod, setMyMod] = useState(null);
  const navigate = useNavigate();
  const role = getCurrentUser().role;

  useEffect(() => {
    async function readRequests() {
      try {
        const res = await getAllReq();
        console.log(res.data);
        setRequests(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    readRequests();
  }, []);
  useEffect(() => {

    const loadNgos = async () => {
      try {
        const res = await nonverifiedNgo();
        setNgos(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.log(e);
        
      } 
    };

    loadNgos();

  }, []);
  useEffect(() => {
    const loadIssues = async () => {
      try {
        const res = await nonverifiedIssue();
         setIssues(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.log(e);
        
      } 
    };

    loadIssues();

  }, []);
  useEffect(() => {
    async function getMod() {
      try {
        const res = await me();
        setMyMod(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getMod();
  }, []);
  if (role !== "MODERATOR") {
    navigate("/");
    return;
  }
  return (
    <main className="mod-page">
      <ModNav navActive={navActive} setNavActive={setNavActive} />
      {navActive === "modAna" && (
        <ModAnalytics myMod={myMod} requests={requests} ngos={ngos} issues={issues}/>
      )}
      {navActive === "modVeri" && <ModVerifyIssue issues={issues}/>}
      {navActive === "modnreq" && <ModNgoVerify ngos={ngos} />}
      {navActive === "modireq" && <ModIssueReq requests={requests} />}
      {navActive === "modProf" && <ModProfile myMod={myMod} />}
    </main>
  );
}
