import { getCookie } from "../../helpers/cookie";

import { AuthGet } from "../../utils/admins/requestAuth";

const token = getCookie("token-admin") || "";

export const getListEmployers = async (findId="")=>{
    const result = await AuthGet(`/employers?findAll=true&findId=${findId}`,token);
    return result;
}
