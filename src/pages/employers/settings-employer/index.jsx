import { Tabs } from "antd";
import "./settings-employer.scss";
import MemoizedInfoEmployer from "./infoEmployer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faBuilding } from "@fortawesome/free-solid-svg-icons";
import ChangePassword from "./changePassword";
import InfoCompany from "./infoCompany";


function SettingEmployer() {

  const itemsTab = [
    {
      label: (
        <div className="box-text-ok">
          <FontAwesomeIcon icon={faUser} />
          <div>Thông tin cá nhân</div>
        </div>
      ),
      key: "1",
      children: <MemoizedInfoEmployer  />,
    },
    {
      label: (
        <div className="box-text-ok">
          <FontAwesomeIcon icon={faLock} />
          <div>Đổi mật khẩu</div>
        </div>
      ),
      key: "2",
      children: <ChangePassword />,
    },
    {
      label: (
        <div className="box-text-ok">
          <FontAwesomeIcon icon={faBuilding} />
          <div>Thông tin công ty</div>
        </div>
      ),
      key: "3",
      children: <InfoCompany/>,
    },
  ];
  return (
    <div className="container-fluid page-content mt-4 setting-employer">
      <div className="title-employer-setting  ml-10 mb-4">
        <h3>Cài đặt tài khoản</h3>
      </div>
      <div className="box-tab">
        <Tabs tabPosition={"left"} type="card" items={itemsTab} />
      </div>
    </div>
  );
}
export default SettingEmployer;
