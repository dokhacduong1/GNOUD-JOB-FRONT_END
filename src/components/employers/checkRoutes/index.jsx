import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";
import { deleteAllCookies} from "../../../helpers/cookie";
import { useEffect } from "react";

import { CheckAuthEmployer } from "../../../helpers/checkAuthEmployer";
import { authenticationEmployer } from "../../../stores/employers/actions/auth";

//Hàm này check xem đã login hay chưa nếu đã login thì sẽ chuyển hướng về trang home nếu chưa thì sẽ chuyển hướng về trang login
function CheckRoutesEmployer() {
   
     //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
     const authenMainEmployer = useSelector((data) => data.authenticationReducerEmployer.status);
     const dispatch = useDispatch();
     useEffect(() => {
         const checkAuthen = async () => {
            const CheckAuth = await CheckAuthEmployer()
             //if check token đúng thì gán lại token không rỗng
             if (CheckAuth.status) {
                //nếu đúng thì sẽ dispath thành true và thêm infoUser vào trong store
                 dispatch(authenticationEmployer(true,CheckAuth.infoUserEmployer));
             } else {
                 //nếu không thì sẽ xóa token và sẽ dispath thành false mặc định infoUser sẽ là rỗng
                 dispatch(authenticationEmployer(false));
                 //Nếu người dùng thay đổi cookie sẽ xóa hết cookie và chuyển hướng về trang login
                 deleteAllCookies();
             }
         }
         checkAuthen();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    return (
        <>

            {authenMainEmployer ? (<Navigate to="/nha-tuyen-dung" />) : (<Outlet />)}
        </>
    )
}

export default CheckRoutesEmployer;