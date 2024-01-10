import { checkAuthenAccountAdmin } from "../services/admins/adminsApi";
import { getCookie } from "./cookie";

export async function CheckAuthAdmin() {
    const checkToken = getCookie("token-admin");

    const obj = {
        token: checkToken
    }
    const authenAccount = await checkAuthenAccountAdmin(obj, checkToken);
    
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