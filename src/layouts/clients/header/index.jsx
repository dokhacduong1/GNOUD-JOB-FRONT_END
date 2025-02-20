import "./header.scss";

import { Link, NavLink } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import DropMenu from "./dropMenu";

import { searchCv, searchJob } from "./js/options";

function Header() {
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

  const [linkLocation] = useState(location.pathname);

  const itemsMenuNav = [
    {
      label: (
        <Dropdown
          overlayClassName="drop-menu-ok"
          menu={{ items: searchJob, selectedKeys: linkLocation }}
          placement="bottomLeft"
        >
          <div style={{ fontWeight: "500" }}>Tìm Việc Làm</div>
        </Dropdown>
      ),
      key: "viec-lam",
      icon: null,
    },
    {
      label: (
        <Dropdown
          overlayClassName="drop-menu-ok"
          menu={{ items: searchCv, selectedKeys: linkLocation }}
          placement="bottomLeft"
        >
          <div style={{ fontWeight: "500" }}>Hồ sơ & CV</div>
        </Dropdown>
      ),
      key: "cv",
      icon: null,
    },
    {
      label: "Cẩm Nang Tuyển Dụng",
      key: "3",
      icon: null,
    },
    {
      label: "Tiện Ích",
      key: "4",
      icon: null,
    },
  ];
  const items = [
    
    {
      key: "2",
      label: <Link to="/login">Đăng nhập</Link>,
    
    },
    {
      key: "3",
      label: <Link to="/register">Đăng ký</Link>,
     
    },
    {
      key: "4",
      label: <Link to="/nha-tuyen-dung">Nhà tuyển dụng</Link>,
    },
  ];

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="header__logo col-xl-2 col-6">
              <NavLink className="mr-1" to="/">
                GNOUD
              </NavLink>
            </div>
            <div className="header__search col-3 text-center">
              <Menu
                selectedKeys={location.pathname.split("/")[1]}
                mode="horizontal"
                items={itemsMenuNav}
              />
            </div>

            {!authenMainClient.status ? (
              <>
                <div className="header__boxUsers col-5 text-center">
                  <div className="row col-12 justify-content-end align-items-center">
                    <div className="header__boxUsers-user col-3">
                      <NavLink className="mr-1" to={"/login"}>
                        Đăng nhập
                      </NavLink>
                      <div className="inner-dir "></div>
                    </div>
                    <div className="header__boxUsers-user col-3">
                      <NavLink className="ml-1" to={"/register"}>
                        Đăng ký
                      </NavLink>
                      <div className="inner-dir"></div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: "24px" }}
                  className="header__employer text-center col-2"
                >
                  <a href={"/nha-tuyen-dung"}>Nhà tuyển dụng</a>
                </div>
                <div className="header__reponsived col-6 text-end">
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={['click']}
                  >
                    <div style={{ fontSize: "22px", cursor: "pointer" }}>
                      {" "}
                      <MenuOutlined />
                    </div>
                  </Dropdown>
                </div>
              </>
            ) : (
              <DropMenu infoUser={authenMainClient?.infoUser} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
