import api from "./axios";

export const ngoCreate= (data)=>
    api.put("/auth/register/ngo",data,
        {
    headers: {
      "Content-Type": "application/json",
    },
  }
    );

export const ngoUpdate= (data)=>
    api.put("/ngo/update",data);

export const ngoShowInt= (data)=>
    api.put(`/ngo/${ngoId}/show-interest`,data);

export const ngoCat= ()=>
    api.get(`/ngo/${ngoId}/all-categories`);

export const ngoIssues= ()=>
    api.get(`/ngo/${ngoId}/show-interest`);