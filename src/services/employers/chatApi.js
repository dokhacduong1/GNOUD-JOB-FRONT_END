
// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";

import { AuthGet} from "../../utils/employers/requestAuth";

const checkToken = getCookie("token-employer") || "";

export const getContentChat = async (idUser)=>{
    const result = await AuthGet(`/chat/get-content-chat/${idUser}`,checkToken);
    return result;
}
export const getHistoryChat = async ()=>{
    const result = await AuthGet(`/chat/get-history-chat`,checkToken);
    return result;
}