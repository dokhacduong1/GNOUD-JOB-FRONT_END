
// import { getCookie } from "../../helpers/cookie";
import { getCookie } from "../../helpers/cookie";
import { AuthGet } from "../../utils/clients/requestAuth";



const checkToken = getCookie("token-user") || "";


export const getContentChatClient = async (idUser)=>{
  
    const result = await AuthGet(`/chat/get-content-chat/${idUser}`,checkToken);
    return result;
}

export const getHistoryChatClient = async ()=>{
    const result = await AuthGet(`/chat/get-history-chat`,checkToken);
    return result;
}