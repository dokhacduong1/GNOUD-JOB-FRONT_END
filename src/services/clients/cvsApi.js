

import { getCookie } from "../../helpers/cookie";

import { AuthGet } from "../../utils/clients/requestAuth";
const checkToken = getCookie("token-user") || "";

export const getCvInfoUserClient = async (idUser)=>{
    const result = await AuthGet(`/cvs/get-cv-info-user/${idUser}`,checkToken);
    return result;
}