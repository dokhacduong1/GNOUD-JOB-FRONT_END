/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import { Helmet } from 'react-helmet';

import { Outlet } from "react-router-dom";




const { Content } = Layout;
function LayoutMainEmployersNoHeaderAndNoFooter() {
  //Lấy ra trạng thái của authenMainEmployers false là chưa đăng nhập true là đã đăng nhập
  // const authenMainEmployers = useSelector((status) => status.authenticationReducerClient);

  <Helmet>
  {/* Không thêm meta viewport */}
</Helmet>
 
  return (
    <>
      <Layout className="scroll-css">
      
        <Content >
          <Outlet />
        </Content>
       
      </Layout>
    </>
  );
}
export default LayoutMainEmployersNoHeaderAndNoFooter;
