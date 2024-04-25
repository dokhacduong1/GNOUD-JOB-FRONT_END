import "./SliderHome.scss";
import { Menu } from "antd";

import { AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faGear,
  faPlus,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LINK_URL = "/nha-tuyen-dung/app/";
function SliderHome() {
  //Lấy thông tin quyền từ store của  redux
  const [infoUserEmployer, setInfoUserEmployer] = useState({});
  const location = useLocation();
  const authenMainEmployer = useSelector(
    (status) => status.authenticationReducerEmployer
  );
  useEffect(() => {
    const { infoUserEmployer } = authenMainEmployer;
    setInfoUserEmployer(infoUserEmployer);
  }, [authenMainEmployer]);
  return (
    <>
      {authenMainEmployer?.status === true && (
        <Menu
          className="layout__sliderEmployer-menu"
          defaultSelectedKeys={location.pathname}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["dashboard"]}
          mode="inline"
          // items={items}
          theme="light"
        >
          <Menu.Item
            className="layout__sliderEmployer-box"
            key={"avatar"}
            icon={
              <span className="layout__sliderEmployer-item">
                <img src={infoUserEmployer?.image} alt="" />
              </span>
            }
          >
            <div className="content">
              <span className="name">
                <a href="#!">{infoUserEmployer?.fullName} </a>
              </span>
              <span className="role">Employer</span>
              <div className="role-check">
                <span>Tài khoản xác thực: </span>
                <span style={{ color: "#f7619d" }}>
                  Cấp {infoUserEmployer?.countActive}/2
                </span>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item
            className="layout__sliderEmployer-shield"
            key={"verify"}
            icon={
              <span className="layout__sliderEmployer-item shield">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>
            }
          >
            {infoUserEmployer?.countActive === 2 ? (
              <>
                <a style={{color:"rgb(250, 122, 173)",fontWeight:"500"}} to={LINK_URL + "verify"}>Tài khoản đã xác thực </a>
              </>
            ) : (
              <>
                <a to={LINK_URL + "verify"}>Xác thực tài khoản </a>
               
              </>
            )}
             <span className="anmation-css">
                  <FontAwesomeIcon icon={faChevronRight} />
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
          </Menu.Item>

          <Menu.Item key={"hr-1"}>
            <hr />
          </Menu.Item>

          <Menu.Item
            key={LINK_URL + "dashboard"}
            icon={
              <span className="layout__sliderEmployer-item">
                <AppstoreOutlined />
              </span>
            }
          >
            <Link to={LINK_URL + "dashboard"}>Bảng tin</Link>
          </Menu.Item>
          <Menu.Item
            key={LINK_URL + "management-jobs"}
            icon={
              <span className="layout__sliderEmployer-item">
                <FontAwesomeIcon icon={faFileLines} />
              </span>
            }
          >
            <Link to={LINK_URL + "management-jobs"}>Tin tuyển dụng</Link>
          </Menu.Item>
          <Menu.Item
            key={LINK_URL + "add-jobs-employer"}
            icon={
              <span className="layout__sliderEmployer-item">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            }
          >
            <Link to={LINK_URL + "add-jobs-employer"}>Thêm chiến dịch</Link>
          </Menu.Item>
          <Menu.Item
            key={LINK_URL + "management-cvs"}
            icon={
              <span className="layout__sliderEmployer-item">
                <FontAwesomeIcon icon={faCircleUser} />
              </span>
            }
          >
            <Link to={LINK_URL + "management-cvs"}>Quản lý CV</Link>
          </Menu.Item>
          <Menu.Item key={"hr-2"}>
            <hr />
          </Menu.Item>
          <Menu.Item
            key={LINK_URL + "account/settings"}
            icon={
              <span className="layout__sliderEmployer-item">
                <FontAwesomeIcon icon={faGear} />
              </span>
            }
          >
            <Link to={LINK_URL + "account/settings"}>Cài đặt tài khoản</Link>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
}
export default SliderHome;
