import { getCookie } from "../../helpers/cookie";

import { AuthDel, AuthGet, AuthPatch, AuthPost } from "../../utils/admins/requestAuth";

const token = getCookie("token-admin") || "";
export const getListJobsAdmin = async ()=>{
    const result = await AuthGet(`/jobs?findAll`,token);
    return result;
}
export const createJobs = async (data)=>{
    const result = await AuthPost(`/jobs/create`,data,token);
    return result;
}
export const getAllJobs = async (valueStatus = "",keyword="",sortKey="",sortValue ="")=>{
    const result = await AuthGet(`/jobs?findAll=true&status=${valueStatus}&keyword=${keyword}&sortKey=${sortKey}&sortValue=${sortValue}&`,token);
    return result;
}
export const deleteSingleJobs = async (id)=>{
    const result = await AuthDel(`/jobs/delete/${id}`,token);
    return result;
}
export const changeStatusSingleJobs = async (id,status)=>{
    const result = await AuthPatch(`/jobs/change-status/${id}`,status,token);
    return result;
}
export const changeMultipleJobs = async (data)=>{
    const result = await AuthPatch(`/jobs/change-multi`,data,token);
    return result;
}
export const editJobs = async (id,data)=>{
    const result = await AuthPatch(`/jobs/edit/${id}`,data,token);
    return result;
}