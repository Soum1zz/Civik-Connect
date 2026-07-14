import { data } from "react-router-dom";
import api from "./axios";
  
const token = localStorage.getItem("token");

export const ngoCreate = (data) =>
  api.put("/auth/register/ngo", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getmyngo = () => {
  try {
    return api.get("/ngo/my-ngo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const ngoUpdate = (id) => api.get(`/ngo/${id}`);

export const ngoShowInt = (iId) =>
  api.put(`/ngo/issue/${iId}/show-interest`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const ngoCat = (ngoId) => api.get(`/search/ngo/${ngoId}/all-categories`);

export const ngoIssues = (ngoId) =>
  api.get(`/ngo/ngo/${ngoId}/all-issues`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getIssuesByState = (state) =>
  api.get("/search/issue/open-issues", {
    params: { state },
  });

export const getAllNgos = () => api.get("/search/all-ngo");

export const searchNgos = (search) =>
  api.get("/search/ngo/search", {
    params: { search },
  });
