/* eslint-disable no-unused-vars */
import { Layout } from "antd";

import Header from "./header/index";
import FooterMain from "./footer/index";
import { Outlet } from "react-router-dom";



const { Content } = Layout;
function LayoutMainClient() {
  
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };
 
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
