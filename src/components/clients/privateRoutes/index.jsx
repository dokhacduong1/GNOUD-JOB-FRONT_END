import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../../helpers/cookie";
import { useEffect, useState } from "react";

import { CheckAuthClient } from "../../../helpers/checkAuthClient";
import { authenticationClient } from "../../../stores/clients/actions/auth";

//Hàm này check xem đã login hay chưa nếu đã login thì sẽ chuyển hướng về trang home nếu chưa thì sẽ chuyển hướng về trang login
function PrivateRoutesClient() {
  //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
//   const authenMainClient = useSelector(
//     (data) => data.authenticationReducerClient.status
//   );
  const dispatch = useDispatch();
  const [authen, setAuthen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthen = async () => {
      const CheckAuth = await CheckAuthClient();
  
      //if check token đúng thì gán lại token không rỗng
      if (CheckAuth.status) {
        //nếu đúng thì sẽ dispath thành true và thêm infoUser vào trong store
        dispatch(authenticationClient(true, CheckAuth.infoUser));
      } else {
        //nếu không thì sẽ xóa token và sẽ dispath thành false mặc định infoUser sẽ là rỗng
        dispatch(authenticationClient(false));
        //Nếu người dùng thay đổi cookie sẽ xóa hết cookie và chuyển hướng về trang login
        deleteAllCookies();
        navigate("/login");
        setAuthen(false);
      }
    };
    checkAuthen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{authen ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoutesClient;
