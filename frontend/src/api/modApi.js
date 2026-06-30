import api from "./axios";

const verifyIssue= ()=>
    api.put(`/issue/${iId}/verify`);

const resolveIssue= ()=>
    api.put(`/issue/${iId}/verify`);

const rejectIssue= ()=>
    api.put(`/issue/${iId}/verify`);

const assignIssue= (data)=>
    api.put(`/issue/assign`,data);

const nonverifiedIssue= ()=>
    api.get(`/issue/not-verified`);

const banUser= ()=>
    api.put(`/user/${uId}/ban`);

const unbanUser= ()=>
    api.put(`/user/${uId}/unban`);

const verifyNgo= ()=>
    api.put(`/ngo/${ngoId}/verify`);