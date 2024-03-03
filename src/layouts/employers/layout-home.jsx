/* eslint-disable no-unused-vars */
import { Layout } from "antd";

import Header from "./header/index";
import FooterMain from "./footer/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const { Content } = Layout;
function LayoutMainEmployersNoHeaderAndNoFooter() {
  //Lấy ra trạng thái của authenMainEmployers false là chưa đăng nhập true là đã đăng nhập
  // const authenMainEmployers = useSelector((status) => status.authenticationReducerClient);


 
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
