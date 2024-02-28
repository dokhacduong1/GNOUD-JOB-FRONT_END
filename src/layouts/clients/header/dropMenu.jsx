import {
  faBell,
  faCircleUp,
  faEnvelope,
  faEye,
  faMessage,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "antd";
import "./header.scss";
import {
  faArrowRightFromBracket,
  faGears,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function DropMenu(props) {
  const { infoUser } = props;

  const logout = () => {
    Cookies.remove("token-user");
    window.location.href = "/login";
  };

  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="info-drop">
            <div className="info-drop__header">
              <div className="avatar">
                <img src={infoUser?.avatar} alt="default" />
              </div>
              <div className="item">
                <p className="name-info">{infoUser.fullName}</p>
                <p className="key-info">
                  Mã ứng viên: <strong>#2709</strong>
                </p>
                <p className="email-info">Email: {infoUser.email}</p>
              </div>
            </div>
            <hr />
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <Link className="info-drop__button" to="/tai-khoan/thong-tin">
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Cài đặt thông tin cá nhân</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="info-drop__button"
          to="/tai-khoan/cai-dat-goi-y-viec-lam"
        >
          <FontAwesomeIcon icon={faGears} />
          <span>Cài đặt gợi ý việc làm</span>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <Link className="info-drop__button" to="/tai-khoan/test">
            <FontAwesomeIcon icon={faCircleUp} />
            <span>Nâng cấp tài khoản</span>
          </Link>
         
        </>
      ),
    },
   
    {
      key: "5",
      label: (
        <a className="info-drop__button" href="#!">
          <FontAwesomeIcon icon={faEye} />
          <span> Nhà tuyển dụng xem hồ sơ</span>
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <Link className="info-drop__button" to="/tai-khoan/mat-khau">
          <FontAwesomeIcon icon={faLock} />
          <span>Đổi mật khẩu</span>
        </Link>
      ),
    },
    {
      key: "8",
      label: (
        <>
          <Link
            className="info-drop__button"
            to="/tai-khoan/cai-dat-thong-bao-email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Cài đặt nhận email</span>
          </Link>
        
        </>
      ),
    },
   
    {
      key: "9",
      label: (
        <a onClick={logout} className="info-drop__button" href="#!">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span style={{ color: "rgb(250 122 109)" }}>Đăng xuất</span>
        </a>
      ),
    },
  ];
  return (
    <>
      {" "}
      <ul className="header__user col-5">
        <li className="header__user-noti">
          <a href="#!">
            <FontAwesomeIcon icon={faBell} />
          </a>
        </li>
        <li className="header__user-chat">
          <a href="#!">
            <FontAwesomeIcon icon={faMessage} />
          </a>
        </li>
        <Dropdown
          className="dropdown-infod"
          menu={{
            items,
            selectable: true,
          }}
          placement="bottomLeft"
        >
          <li className="header__user-info">
            <div className="info-name">
              <a href="#!">
                <img src={infoUser?.avatar} alt="default" />
                <span>{infoUser?.fullName}</span>
              </a>
            </div>
          </li>
        </Dropdown>
      </ul>
    </>
  );
}
export default DropMenu;
