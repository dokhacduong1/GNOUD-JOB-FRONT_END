// eslint-disable-next-line no-unused-vars
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { authenticationAdmin } from "../../../stores/admins/actions/auth";
import { useDispatch } from "react-redux";
import { deleteAllCookies} from "../../../helpers/cookie";
import { CheckAuthAdmin } from "../../../helpers/checkAuthAdmin";




function PrivateRoutes() {
    //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
    // const authenMainAdmin = useSelector((status) => status.authenticationReducerAdmin);
    const [authen, setAuthen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Không cho [] vào useEffect nó sẽ chạy mỗi khi vào một trang khác
    useEffect(() => {
        const checkAuthen = async () => {
           const CheckAuth = await CheckAuthAdmin()
            //if check token đúng thì gán lại token không rỗng
            if (CheckAuth.status) {
                dispatch(authenticationAdmin(true,CheckAuth.infoUser));
             
            } else {
                //nếu không thì sẽ xóa token và sẽ dispath thành false
                dispatch(authenticationAdmin(false));
                //Nếu người dùng thay đổi cookie sẽ xóa hết cookie và chuyển hướng về trang login
                deleteAllCookies();
                navigate("/admin/login");
                setAuthen(false);
              
            }
          
        }
        checkAuthen()
    
    })
    return (
        <>
            {authen ? (<Outlet />) : (<Navigate to="/admin/login" />)}
        </>
    )
}

export default PrivateRoutes;