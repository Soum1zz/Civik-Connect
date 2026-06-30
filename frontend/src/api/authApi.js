import api from "./axios";

export const login = (data)=>
    api.post("/auth/login", data);

export const register = (data)=>
    api.post("/auth/register", data);

export const me = (data)=>
    api.post("/auth/me", data);

