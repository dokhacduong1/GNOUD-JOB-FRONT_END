import "./SliderHome.scss";
import { Menu } from "antd";

import { AppstoreOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import avatar from "./images/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const LINK_URL = "/nha-tuyen-dung/app/";
function SliderHome() {
  //Lấy thông tin quyền từ store của  redux

  const location = useLocation();

  return (
    <>
      <Menu
        className="layout__sliderEmployer-menu"
        defaultSelectedKeys={location.pathname}
        defaultOpenKeys={["dashboard"]}
        mode="inline"
        // items={items}
        theme="light"
      >
        <Menu.Item
          className="layout__sliderEmployer-box"
          key={LINK_URL + "dashboard"}
          icon={
            <span className="layout__sliderEmployer-item">
              <img src={avatar} alt="" />
            </span>
          }
        >
          <div className="content">
            <span className="name">
              <a href="#!">Đỗ Khắc Dương</a>
            </span>
            <span className="role">Employer</span>
            <div className="role-check">
              <span>Tài khoản xác thực: </span>
              <span style={{ color: "#f7619d" }}>Cấp 1/5</span>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item
          className="layout__sliderEmployer-shield"
          key={LINK_URL + "dashboard2"}
          icon={
            <span className="layout__sliderEmployer-item shield">
              <FontAwesomeIcon icon={faShieldHalved} />
            </span>
          }
        >
          <a to={LINK_URL + "dashboard2"}>Xác thực tài khoản </a>
          <span className="anmation-css">
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </Menu.Item>
        
        <Menu.Item key={"hr-1"}>
          <hr />
        </Menu.Item>

        <Menu.Item
          key={LINK_URL + "dashboard3"}
          icon={
            <span className="layout__sliderEmployer-item">
              <AppstoreOutlined />
            </span>
          }
        >
          <Link to={LINK_URL + "dashboard3"}>Bảng tin</Link>
        </Menu.Item>
        <Menu.Item
          key={LINK_URL + "add-job"}
          icon={
            <span className="layout__sliderEmployer-item">
              <FontAwesomeIcon icon={faFileLines} />
            </span>
          }
        >
          <Link to={LINK_URL + "add-job"}>Tin tuyển dụng</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
export default SliderHome;
