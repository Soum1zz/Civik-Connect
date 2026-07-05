import api from "./axios";

export const login = (data) =>
  api.post("/auth/login", data,
    {
    headers: {
      "Content-Type": "application/json",
    },
  } 
  );

export const register = (data) => api.post("/auth/register", data,
   {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export const me = (data) => api.post("/auth/me", data);
