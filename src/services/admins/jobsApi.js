import { getCookie } from "../../helpers/cookie";

import { AuthGet } from "../../utils/admins/requestAuth";

const token = getCookie("token-admin") || "";
export const getListJobsAdmin = async ()=>{
    const result = await AuthGet(`/jobs?findAll`,token);
    return result;
}
