import api from "./axios";
 const token = localStorage.getItem("token")
export const issueCreate = (data)=>
    api.put("/issue/create",data,{
        headers:{
            Authorization :`Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

export const issueImgs = (data, issueId)=>
    api.put(`/issue/${issueId}/set-issue-img`,data,{
        headers:{
            Authorization :`Bearer ${token}`,
        }
    });

export const updateIssue = (data)=>
    api.put("/issue/update",data);

export const getAllCategories = ()=>
    api.get("/search/issue-categories");
