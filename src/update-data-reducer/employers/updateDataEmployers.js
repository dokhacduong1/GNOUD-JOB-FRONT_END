


import { CheckAuthEmployer } from "../../helpers/checkAuthEmployer";
import { authenticationEmployer } from "../../stores/employers/actions/auth";

export async function UpdateDataAuthEmployer(dispatch) {
    
    const CheckAuth = await CheckAuthEmployer();
    if (CheckAuth.status) {
        console.log("checkauth",CheckAuth.infoUserEmployer);
        dispatch(authenticationEmployer(true, CheckAuth.infoUserEmployer));
    }else{
        dispatch(authenticationEmployer(false, {}));
    }

}