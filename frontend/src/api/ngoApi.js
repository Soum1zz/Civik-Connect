import api from "./axios";

export const ngoCreate = (data) =>
  api.put("/auth/register/ngo", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getmyngo = () => {
  const token = localStorage.getItem("token");
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

export const ngoShowInt = (data) =>
  api.put(`/ngo/${ngoId}/show-interest`, data);

export const ngoCat = (ngoId) => api.get(`/search/ngo/${ngoId}/all-categories`);

export const ngoIssues = (ngoId) => api.get(`/ngo/${ngoId}/show-interest`);

export const getIssuesByState = (state) =>
  api.get("/search/issue/open-issues", {
    params: { state },
  });
