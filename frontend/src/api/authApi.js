import api from "./axios";

const token= localStorage.getItem("token")
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

export const me = (data) => api.get("/auth/me",
  {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  }
 );
