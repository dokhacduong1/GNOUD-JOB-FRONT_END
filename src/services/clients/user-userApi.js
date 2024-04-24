

import { getCookie } from "../../helpers/cookie";
import { Get } from "../../utils/admins/request";

import { Post } from "../../utils/clients/request";
import { AuthPost,AuthGet } from "../../utils/clients/requestAuth";
const checkToken = getCookie("token-user") || "";

export const allowSettingUser = async (valueForm)=>{
    const result = await AuthPost(`/users/allow-setting-user`,valueForm,checkToken);
    return result;
}
export const uploadAvatar = async (valueForm)=>{
    const result = await AuthPost(`/users/upload-avatar`,valueForm,checkToken);
    return result;
}

export const registerUser = async (valueForm)=>{
    const result = await Post(`/users/register`,valueForm);
    return result;
}
export const loginUser = async (valueForm)=>{
    const result = await Post(`/users/login`,valueForm);
    return result;
}
export const forgotPasswordUser = async (valueForm)=>{
    const result = await Post(`/users/password/forgot`,valueForm);
    return result;
}
export const checkTokenReset = async (valueForm)=>{
    const result = await Post(`/users/password/check-token`,valueForm);
    return result;
}
export const resetPassword = async (valueForm)=>{
    const result = await Post(`/users/password/reset`,valueForm);
    return result;
}
export const changePassword = async (valueForm)=>{
    const result = await AuthPost(`/users/change-password`,valueForm,checkToken);
    return result;
}
export const changeInfoUser = async (valueForm)=>{
    const result = await AuthPost(`/users/change-info-user`,valueForm,checkToken);
    return result;
}
export const changeJobSuggestions = async (valueForm)=>{
    const result = await AuthPost(`/users/change-job-suggestions`,valueForm,checkToken);
    return result;
}
export const changeEmailSuggestions = async (valueForm)=>{
    const result = await AuthPost(`/users/change-email-suggestions`,valueForm,checkToken);
    return result;
}
export const authenClient = async (valueForm)=>{

    const result = await AuthPost(`/users/authen`,valueForm,checkToken);
    return result;
}

export const getCityApiDuong = async ()=>{
    const result = await Get("",{},"https://duongshop.id.vn/api/v1/duongits/city");
    return result;
}
export const getDistrictApiDuong = async (value)=>{
    const result = await Get("",{},`https://duongshop.id.vn/api/v1/duongits/district/${value}`);
    return result;
}
export const recruitmentJob = async (valueForm)=>{
    const result = await AuthPost(`/users/recruitment-job`,valueForm,checkToken);
    return result;
}
export const uploadCV = async (valueForm)=>{
    const result = await AuthPost(`/users/upload-cv`,valueForm,checkToken);
    return result;
}
export const getCvByUser = async ()=>{
    const result = await AuthGet(`/users/get-cv-user`,checkToken);
    return result;
}
export const editCvByUser = async (valueForm)=>{
    const result = await AuthPost(`/users/edit-cv-user`,valueForm,checkToken);
    return result;
}
export const saveJob = async (valueForm)=>{
    const result = await AuthPost(`/users//save-job`,valueForm,checkToken);
    return result;
}