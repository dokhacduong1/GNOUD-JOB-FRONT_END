import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";
import { deleteAllCookies} from "../../../helpers/cookie";
import { memo, useEffect } from "react";
import { CheckAuthAdmin } from "../../../helpers/checkAuthAdmin";
import { authenticationAdmin } from "../../../stores/admins/actions/auth";

//Hàm này check xem đã login hay chưa nếu đã login thì sẽ chuyển hướng về trang admin nếu chưa thì sẽ chuyển hướng về trang login
function CheckRoutes() {
   
     //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
     const authenMainAdmin = useSelector((data) => data.authenticationReducerAdmin.status);
     const dispatch = useDispatch();
     useEffect(() => {
         const checkAuthen = async () => {
            const CheckAuth = await CheckAuthAdmin()
             //if check token đúng thì gán lại token không rỗng
             if (CheckAuth.status) {
                //nếu đúng thì sẽ dispath thành true và thêm infoUser vào trong store
                 dispatch(authenticationAdmin(true,CheckAuth.infoUser));
             } else {
                 //nếu không thì sẽ xóa token và sẽ dispath thành false mặc định infoUser sẽ là rỗng
                 dispatch(authenticationAdmin(false));
                 //Nếu người dùng thay đổi cookie sẽ xóa hết cookie và chuyển hướng về trang login
                 deleteAllCookies();
             }
         }
         checkAuthen();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    return (
        <>

            {authenMainAdmin ? (<Navigate to="/admin" />) : (<Outlet />)}
        </>
    )
}


const MemoizedCheckRoutes= memo(CheckRoutes);
export default MemoizedCheckRoutes;