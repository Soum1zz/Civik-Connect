import api from "./axios";

export const issueCreate = (data)=>
    api.put("/issue/create",data);

export const updateCreate = (data)=>
    api.put("/issue/update",data);

export const getAllCategories = ()=>
    api.get("/search/issue-categories");
