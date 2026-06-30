import api from "./axios";

const issueCreate = (data)=>
    api.put("/issue/create",data);

const updateCreate = (data)=>
    api.put("/issue/update",data);

