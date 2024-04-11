
// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";

import { AuthGet} from "../../utils/employers/requestAuth";

const checkToken = getCookie("token-employer") || "";

export const chatPrivate = async ()=>{
    const result = await AuthGet(`/chat/private/1/2`,checkToken);
    return result;
}