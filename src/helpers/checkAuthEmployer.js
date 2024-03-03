

import { authenEmployer } from "../services/employers/employer-userApi";

export async function CheckAuthEmployer() {

    const authenAccount = await authenEmployer();
    
    if (authenAccount.code === 200) {
        return {
            infoUserEmployer: authenAccount.infoUserEmployer,
            status:true
        }
    }
    return {
        infoUserEmployer: {},
        status:false
    }
} 