import { Avatar, Badge } from "antd";
import "./header.scss";
import { MenuOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell,
  faChartLine,
  faPen,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
function Header({ setIsCollapsed, isCollapsed }) {
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    Cookies.remove("token-employer");
    window.location.href = "/nha-tuyen-dung/login";
  };
  return (
    <>
      <nav className="headerEmployer text-left">
        <div className="flex-div gx-1 align-items-center">
          <div className="headerEmployer__header">
            <button
              onClick={handleCollapsed}
              className="headerEmployer__button"
            >
              <MenuOutlined />
            </button>
            <a href="#!">
              <span className=" headerEmployer__logo">GNOUD</span>
            </a>
          </div>

          <div className="headerEmployer__navbar">
            <ul className="navbar__ul">
              <li className="navbar__item main">
                <FontAwesomeIcon icon={faChartLine} />
                <span>Báo cáo thị trường tuyển dụng</span>
              </li>
              <li className="navbar__item check">
                <Link to={"./add-jobs-employer"}>
                  <FontAwesomeIcon icon={faPen} />
                  <span to={"./add-jobs-employer"}>Đăng tin</span>
                </Link>
              </li>
              <li className="navbar__item check">
                <Link>
                  <FontAwesomeIcon icon={faPen} />
                  <span>Tìm CV</span>
                </Link>
              </li>
              <li className="navbar__item check">
                <Link to={"./chat-box"}>
                  <FontAwesomeIcon icon={faFacebookMessenger} />
                  <span to={"./chat-box"}>Kết nối</span>
                </Link>
              </li>
              <li className="navbar__item check">
                <Link>
                  <FontAwesomeIcon icon={faQuestion} />
                  <span>Trợ giúp</span>
                </Link>
              </li>
              <li className="navbar__item no-check">
                <Badge count={1}>
                  <Avatar
                    shape="square"
                    icon={<FontAwesomeIcon icon={faBell} />}
                  />
                </Badge>
              </li>
              <li className="navbar__item check" onClick={handleLogout}>
                <span>Đăng xuất</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
