import { getCookie } from "../../helpers/cookie";

import { AuthDel, AuthGet, AuthPatch, AuthPost } from "../../utils/admins/requestAuth";

const token = getCookie("token-admin") || "";

export const uploadCategories = async (data)=>{
    const result = await AuthPost(`/job-categories/create`,data,token);
    return result;
}
export const editCategories = async (id,data)=>{
    const result = await AuthPatch(`/job-categories/edit/${id}`,data,token);
    return result;
}
export const getTreeCategories = async ()=>{
    const result = await AuthGet(`/job-categories/tree`,token);
    return result;
}
export const getAllJobsCategories = async (valueStatus = "",keyword="",sortKey="",sortValue ="",tree ="false")=>{
    const result = await AuthGet(`/job-categories?findAll=true&status=${valueStatus}&keyword=${keyword}&sortKey=${sortKey}&sortValue=${sortValue}&tree=${tree}`,token);
    return result;
}
export const deleteSingleCategories = async (id)=>{
    const result = await AuthDel(`/job-categories/delete/${id}`,token);
    return result;
}
export const changeStatusSingleCategories = async (id,status)=>{
    const result = await AuthPatch(`/job-categories/change-status/${id}`,status,token);
    return result;
}

export const changeMultipleCategories = async (data)=>{
    const result = await AuthPatch(`/job-categories/change-multi`,data,token);
    return result;
}

export const searchCategories = async (keyword,status="")=>{
    const result = await AuthGet(`/job-categories/search?keyword=${keyword}&status=${status}`,token);
    return result;
}
