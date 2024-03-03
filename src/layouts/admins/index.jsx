/* eslint-disable react/jsx-no-comment-textnodes */
import { Layout } from "antd";
import Header from "./header";
import { Outlet} from "react-router-dom";
// import FooterMain from "./footer";
import Sider from "antd/es/layout/Sider";
import SliderHome from "./SliderHome";
import { useSelector } from "react-redux";
import {useState } from "react";

const { Content } = Layout; 

function LayoutMainAdmin() {
  //Lấy ra trạng thái của authenticationReducerAdmin false là chưa đăng nhập true là đã đăng nhập
  const authenMainAdmin = useSelector((status) => status.authenticationReducerAdmin);
  const authenMainClient = useSelector((status) => status);
 
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout__admin">
        <Header className="layout__header" />
        <Layout>
          {
            authenMainAdmin.status && (
              <Sider collapsed={collapsed} className="mt-3 mb-3">
                <SliderHome collapsed = {collapsed}  setCollapsed = {setCollapsed}/>
              </Sider>)
          }
         
          <Content className="layout__main mt-3 mb-3" style={{ marginLeft: "1rem" }}>
            <Outlet />
          </Content>
        </Layout>

        {/* <FooterMain /> */}
      </Layout>
    </>
  );
}
export default LayoutMainAdmin;
