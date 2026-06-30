import api from "./axios";

const getAll = ()=>
    api.get("/user/all-user");

const createUser = (data)=>
    api.put("/user/create",data);

const updateUser = (data)=>
    api.put("/user/update",data);

const deleteUser = (data)=>
    api.delete("/user/delete",data);