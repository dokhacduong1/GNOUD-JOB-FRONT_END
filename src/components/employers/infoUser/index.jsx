// eslint-disable-next-line no-unused-vars
import { Outlet } from "react-router-dom";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { deleteAllCookies } from "../../../helpers/cookie";



import { CheckAuthEmployer } from "../../../helpers/checkAuthEmployer";
import { authenticationEmployer } from "../../../stores/employers/actions/auth";

function InfoUserEmployer() {
  //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
  // const authenMainAdmin = useSelector((status) => status.authenticationReducerAdmin);

  const dispatch = useDispatch();

  //Không cho [] vào useEffect nó sẽ chạy mỗi khi vào một trang khác
  useEffect(() => {
    const checkAuthen = async () => {
      const CheckAuth = await CheckAuthEmployer();
   
      //if check token đúng thì gán lại token không rỗng
      if (CheckAuth.status) {
        dispatch(authenticationEmployer(true, CheckAuth.infoUserEmployer));
      } else {
        //nếu không thì sẽ xóa token và sẽ dispath thành false
        dispatch(authenticationEmployer(false));
        //Nếu người dùng thay đổi cookie sẽ xóa hết cookie và chuyển hướng về trang login
        deleteAllCookies();
      }
    };
    checkAuthen();
  });
  return (
    <>
      <Outlet />
    </>
  );
}

export default InfoUserEmployer;
