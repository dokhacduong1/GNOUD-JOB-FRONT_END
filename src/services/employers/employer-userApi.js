

// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";
import { Post } from "../../utils/employers/request";
import { AuthGet, AuthPost } from "../../utils/employers/requestAuth";

const checkToken = getCookie("token-employer") || "";

export const registerUserEmployer = async (valueForm)=>{
    const result = await Post(`/users/register`,valueForm);
    return result;
}
export const loginUserEmployer = async (valueForm)=>{
    const result = await Post(`/users/login`,valueForm);
    return result;
}
export const forgotPasswordUserEmployer = async (valueForm)=>{
    const result = await Post(`/users/password/forgot`,valueForm);
    return result;
}
export const checkTokenResetEmployer = async (valueForm)=>{
    const result = await Post(`/users/password/check-token`,valueForm);
    return result;
}
export const resetPasswordEmployer = async (valueForm)=>{
    const result = await Post(`/users/password/reset`,valueForm);
    return result;
}

export const authenEmployer = async (valueForm={})=>{

    const result = await AuthPost(`/users/authen`,valueForm,checkToken);
    return result;
}
export const uploadAvatarEmployer = async (valueForm)=>{
    const result = await AuthPost(`/users/upload-avatar`,valueForm,checkToken);
    return result;
}
export const changeInfoEmployer = async (valueForm)=>{
    const result = await AuthPost(`/users/change-info-employer`,valueForm,checkToken);
    return result;
}
export const changeInfoCompany = async (valueForm)=>{
    const result = await AuthPost(`/users/change-info-company`,valueForm,checkToken);
    return result;
}

export const verifyPassword = async (valueForm)=>{
    const result = await AuthPost(`/users/verify-password`,valueForm,checkToken);
    return result;
}
export const sendEmsPhoneEmployer = async (valueForm)=>{
    const result = await AuthPost(`/users/send-sms`,valueForm,checkToken);
    return result;
}
export const verifyPhoneEmployer = async (valueForm)=>{
    const result = await AuthPost(`/users/verify-code-sms`,valueForm,checkToken);
    return result;
}
export const changePasswordEmployer = async (valueForm)=>{
    const result = await AuthPost(`/users/change-password`,valueForm,checkToken);
    return result;
}


export const statisticCompany = async ()=>{
    const result = await AuthGet(`/users/statistic-company`,checkToken);
    return result;
}
