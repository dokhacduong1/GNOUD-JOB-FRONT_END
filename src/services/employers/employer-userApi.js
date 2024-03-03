

// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";
import { Post } from "../../utils/employers/request";
import { AuthPost } from "../../utils/employers/requestAuth";

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