import api from "./axios";

export const getAll = ()=>
    api.get("/user/all-user");



export const createUser = (data)=>
    api.put("/user/create",data);

export const updateUser = (data)=>
    api.put("/user/update",data);

export const deleteUser = (data)=>
    api.delete("/user/delete",data);