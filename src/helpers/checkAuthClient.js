
import { authenClient } from "../services/clients/user-userApi";
import { getCookie } from "./cookie";

export async function CheckAuthClient() {
    const checkToken = getCookie("token-user") || "";

    const obj = {
        token: checkToken
    }
    const authenAccount = await authenClient(obj);
    
    if (authenAccount.code === 200) {
        return {
            infoUser: authenAccount.infoUser,
            status:true
        }
    }
    return {
        infoUser: {},
        status:false
    }
} 