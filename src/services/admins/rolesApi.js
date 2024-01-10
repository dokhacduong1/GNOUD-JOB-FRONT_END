import { getCookie } from "../../helpers/cookie";

import { AuthDel, AuthGet, AuthPatch, AuthPost } from "../../utils/admins/requestAuth";
//lấy token từ cookie
const token = getCookie("token-admin") || "";

export const createRoles = async (data) => {
    const result = await AuthPost(`/roles/create`, data, token);
    return result;
}
export const editRoles = async (id, data) => {
    const result = await AuthPatch(`/roles/edit/${id}`, data, token);
    return result;
}
export const editRolesPermissions = async (id, data) => {
    const result = await AuthPatch(`/roles/edit-permissions/${id}`, data, token);
    return result;
}

export const getAllRoles = async (keyword = "", sortKey = "", sortValue = "") => {
    const result = await AuthGet(`/roles?keyword=${keyword}&sortKey=${sortKey}&sortValue=${sortValue}`, token);
    return result;
}
export const deleteSingleRoles = async (id) => {
    const result = await AuthDel(`/roles/delete/${id}`, token);
    return result;
}
export const changeMultipleRoles = async (data) => {
    const result = await AuthPatch(`/roles/change-multi`, data, token);
    return result;
}
export const searchRoles = async (keyword) => {
    const result = await AuthGet(`/roles/search?keyword=${keyword}`,token);
    return result;
}

export const getInfoRoles = async ()=>{
    const result = await AuthGet("/roles/info",token);
    return result;
}