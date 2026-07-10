import api from "./axios";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAll = ()=>
    api.get("/user/all-user");

export const getUserName = (uid)=>
    api.get(`/search/${uid}/user-name`);

export const getAllIssues = ()=>
    api.get("/user/all-issue",
        {
            headers: authHeaders(),
        }
    )

export const createUser = (data)=>
    api.put("/user/create",data);

export const updateUser = (data)=>
    api.put("/user/update",data);

export const deleteUser = (data)=>
    api.delete("/user/delete",data);
