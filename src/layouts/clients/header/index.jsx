import "./header.scss";
import { DownloadOutlined } from "@ant-design/icons";

import { NavLink, useLocation } from "react-router-dom";
import { Collapse, Button, Select, Menu, Dropdown } from "antd";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import DropMenu from "./dropMenu";
import { getCityApiDuong } from "../../../services/clients/user-userApi";
import { searchCv, searchJob } from "./js/options";

function Header() {
  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );
  const location = useLocation();
  const[linkLocation,setLinkLocation] = useState(location.pathname)
  const [isCollapseVisible, setIsCollapseVisible] = useState(0);

  const [city, setCity] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const recordCity = await getCityApiDuong();
      if (recordCity.code === 200) {
        const convertCity = recordCity.data.map((dataMap) => ({
          label: dataMap.name,
          value: dataMap.code,
        }));
        setCity(convertCity);
      }
    };
    fetchApi();
  }, []);

  

  const buttonClickCollab = () => {
    const numberCheck = isCollapseVisible === 1 ? 0 : 1;
    setIsCollapseVisible(numberCheck);
  };
  const handleClickMenu = (agrs) => {
    const { key } = agrs;
    if (key !== "5") {
      setIsCollapseVisible(0);
    }
  };
  useEffect(()=>{
  
    setLinkLocation(location.pathname)
  },[location.pathname])
  const itemsMenuNav = [
    {
      label: (
        <Dropdown
      
          overlayClassName="drop-menu-ok"
          menu={{ items: searchJob, selectedKeys:linkLocation }}
          placement="bottomLeft"
        >
          <div style={{fontWeight:"500"}}>Tìm Việc Làm</div>
        </Dropdown>
      ),
      key: "viec-lam",
      icon: null,
    },
    {
      label: (
        <Dropdown
      
          overlayClassName="drop-menu-ok"
          menu={{ items: searchCv, selectedKeys:linkLocation }}
          placement="bottomLeft"
        >
          <div style={{fontWeight:"500"}}>Hồ sơ & CV</div>
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

  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="header__logo col-2">
              <NavLink className="mr-1" to="/">
                GNOUD
              </NavLink>
            </div>
            <div className="header__search col-5 text-center">
              <Menu
                selectedKeys={location.pathname.split("/")[1]}
                onClick={handleClickMenu}
                mode="horizontal"
                items={itemsMenuNav}
              />
            </div>
       
            {!authenMainClient.status ? (
              <>
                <div className="header__boxUsers col-3 text-center">
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
