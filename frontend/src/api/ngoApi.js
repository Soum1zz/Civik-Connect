import api from "./axios";

const ngoCreate= (data)=>
    api.put("/ngo/create",data);

const ngoUpdate= (data)=>
    api.put("/ngo/update",data);

const ngoShowInt= (data)=>
    api.put(`/ngo/${ngoId}/show-interest`,data);

const ngoCat= ()=>
    api.get(`/ngo/${ngoId}/all-categories`);

const ngoIssues= ()=>
    api.get(`/ngo/${ngoId}/show-interest`);