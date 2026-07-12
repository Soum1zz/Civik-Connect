import api from "./axios";

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const verifyIssue = (iId) =>
    api.put(`/mod/issue/${iId}/verify`, {}, { headers: authHeaders() });

export const resolveIssue = (iId) =>
    api.put(`/mod/issue/${iId}/resolve`, {}, { headers: authHeaders() });

export const rejectIssue = (iId) =>
    api.put(`/mod/issue/${iId}/reject`, {}, { headers: authHeaders() });

export const assignIssue = (data) =>
    api.put(`/mod/issue/assign`, data, { headers: authHeaders() });

export const nonverifiedIssue = () =>
    api.get(`/mod/issue/not-verified`, { headers: authHeaders() });

export const banUser = (uId) =>
    api.put(`/mod/user/${uId}/ban`, {}, { headers: authHeaders() });

export const unbanUser = (uId) =>
    api.put(`/mod/user/${uId}/unban`, {}, { headers: authHeaders() });

export const verifyNgo = (ngoId) =>
    api.put(`/mod/ngo/${ngoId}/verify`, {}, { headers: authHeaders() });

export const nonverifiedNgo = () =>
    api.get(`/mod/ngo/not-verified`, { headers: authHeaders() });
