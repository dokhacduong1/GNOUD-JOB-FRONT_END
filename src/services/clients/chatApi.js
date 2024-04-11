
// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";
import { AuthGet } from "../../utils/clients/requestAuth";



const checkToken = getCookie("token-user") || "";

export const chatPrivateClient = async ()=>{
    const result = await AuthGet(`/chat/private/1/2`,checkToken);
    return result;
}