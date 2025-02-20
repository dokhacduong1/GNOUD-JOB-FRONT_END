/* eslint-disable no-unused-vars */
import { Layout } from "antd";

import Header from "./header/index";
import FooterMain from "./footer/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";



const { Content } = Layout;
function LayoutMainClient() {
  //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
  const authenMainClient = useSelector((status) => status.authenticationReducerClient);


 
  return (
    <>
     <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
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
