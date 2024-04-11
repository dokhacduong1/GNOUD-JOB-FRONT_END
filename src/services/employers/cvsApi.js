

import { getCookie } from "../../helpers/cookie";
import { AuthGet} from "../../utils/employers/requestAuth";

const checkToken = getCookie("token-employer") || "";

export const getCvApply = async (status="",keyword="")=>{
    const result = await AuthGet(`/cvs/get-cv-apply?status=${status}&keyword=${keyword}`,checkToken);
    return result;
}
export const getCvApplyAccept = async ()=>{
    const result = await AuthGet(`/cvs/get-cv-apply-accept`,checkToken);
    return result;
}