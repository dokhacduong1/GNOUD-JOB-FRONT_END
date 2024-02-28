/* eslint-disable no-unused-vars */
import { Layout } from "antd";

import Header from "./header/index";
import FooterMain from "./footer/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const { Content } = Layout;
function LayoutMainClient() {
  //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
  const authenMainClient = useSelector((status) => status.authenticationReducerClient);


 
  return (
    <>
      <Layout>
        <Header className="layout__header" />
        <Content className="mt-5">
          <Outlet />
        </Content>
        <FooterMain />
      </Layout>
    </>
  );
}
export default LayoutMainClient;
