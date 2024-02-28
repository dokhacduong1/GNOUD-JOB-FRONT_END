
import { authenticationClient } from "../../stores/clients/actions/auth";
import { CheckAuthClient } from "../../helpers/checkAuthClient";

export async function UpdateDataAuthClient(dispatch) {
    
    const CheckAuth = await CheckAuthClient();
    if (CheckAuth.status) {
        dispatch(authenticationClient(true, CheckAuth.infoUser));
    }else{
        dispatch(authenticationClient(false, {}));
    }

}