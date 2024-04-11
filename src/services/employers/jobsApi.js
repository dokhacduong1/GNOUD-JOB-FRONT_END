import { getCookie } from "../../helpers/cookie";

import { AuthPost,AuthGet,AuthPatch } from "../../utils/employers/requestAuth";
const checkToken = getCookie("token-employer") || "";
export const createJobs = async (data)=>{
    const result = await AuthPost(`/jobs/create`,data,checkToken);
    return result;
}
export const getAllJobsEmployer = async (valueStatus = "",keyword="")=>{
    const result = await AuthGet(`/jobs?findAll=true&status=${valueStatus}&keyword=${keyword}`,checkToken);
    return result;
}
export const changeStatusSingleJobsEmployer = async (id,status)=>{
    const result = await AuthPatch(`/jobs/change-status/${id}`,status,checkToken);
    return result;
}
export const editJobsEmployer = async (id,data)=>{
    const result = await AuthPatch(`/jobs/edit/${id}`,data,checkToken);
    return result;
}
export const infoJobsEmployer = async (id,status="")=>{
    const result = await AuthGet(`/jobs/info-job/${id}?status=${status}`,checkToken);
    return result;
}

export const getPdfToDriver = async (data)=>{
    const result = await AuthPost(`/jobs/get-pdf`,data,checkToken);
    return result;
}

export const actionCv = async (data)=>{
    const result = await AuthPost(`/jobs/action-cv`,data,checkToken);
    return result;
}
export const coutViewCv = async (data)=>{
    const result = await AuthPost(`/jobs/count-view-cv`,data,checkToken);
    return result;
}
export const userPreviewJob = async (data)=>{
   
    const result = await AuthPost(`/jobs/user-preview-job`,data,checkToken);
    return result;
}

export const followUserJob = async (data)=>{
   
    const result = await AuthPost(`/jobs/follow-user-job`,data,checkToken);
    return result;
}
export const buyUserPreviewJob = async (data)=>{
   
    const result = await AuthPost(`/jobs/buy-user-preview-job`,data,checkToken);
    return result;
}
export const infoUserProfile = async (data)=>{
    const result = await AuthPost(`/jobs/info-user-profile`,data,checkToken);
    return result;
}
export const followUserProfile = async (data)=>{
    const result = await AuthPost(`/jobs/follow-user-profile`,data,checkToken);
    return result;
}
export const deleteFollowProfile = async (data)=>{
    const result = await AuthPost(`/jobs/delete-follow-profile`,data,checkToken);
    return result;
}