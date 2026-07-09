import api from "./axios";

const token = localStorage.getItem("token");

export const getAll = ()=>
    api.get("/user/all-user");

export const getAllIssues = ()=>
    api.get("/user/all-issue",
        {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        }
    )

export const createUser = (data)=>
    api.put("/user/create",data);

export const updateUser = (data)=>
    api.put("/user/update",data);

export const deleteUser = (data)=>
    api.delete("/user/delete",data);