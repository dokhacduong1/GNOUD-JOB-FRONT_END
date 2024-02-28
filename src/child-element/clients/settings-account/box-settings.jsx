import { faArrowUp, faCheck, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import "./box-settings.scss";
import { Switch } from "antd";

import banner2 from "./images/banner2.gif";

import React, { useEffect, useState } from "react";
import {
  valueActivateChangeJobSearch,
  valueAllowChangeSearch,
} from "../../../pages/admins/managementCategories/js/switchSettings";
import ModelChangeImage from "./model-change-image";
function BoxSettings() {
  const [allowSearch, setAllowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeJobSearch, setActiveJobSearch] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const authenMainClient = useSelector(
    (status) => status.authenticationReducerClient
  );

  useEffect(() => {
    setLoading(true);

    //Lấy ra trạng thái của authenMainClient false là chưa đăng nhập true là đã đăng nhập
    const { infoUser } = authenMainClient;

    if (infoUser === undefined) return;
    setAllowSearch(infoUser?.allowSearch);
    setName(infoUser?.fullName);
    setActiveJobSearch(infoUser?.activeJobSearch);
    setAvatar(infoUser?.avatar);
    setLoading(false);
  }, [authenMainClient]);

  return (
    <>
      <div className="col-4 box-setting-account">
        <div className="text-left box-siderbar">
          <div className="box-setting-account__header row ">
            <div className="profile-avatar col-4">
              <img
                src={avatar}
                alt="avatar"
              />
              <span className="vip-badge">VERIFIED</span>

              <ModelChangeImage avatar={avatar}/>
            </div>
            <div className="profile-info col-8">
              <p className="title">Chào mừng bạn</p>
              <h4 className="name">{name}</h4>
              <div className="account-vip">
                <span>Tài khoản đã xác thực</span>
              </div>
              <div className="upgrade-account">
                <a href="#!">
                  <span>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </span>
                  <span>Nâng cấp tài khoản</span>
                </a>
              </div>
            </div>
          </div>

          <hr />

          <div className="box-setting-account__body">
            <div className="job-waiting">
              <div className="col-12 switch-setting">
                <Switch
                  loading={loading}
                  checked={allowSearch}
                  onChange={(checked) =>
                    valueAllowChangeSearch(
                      checked,
                      setAllowSearch,
                      allowSearch,
                      setLoading
                    )
                  }
                />
                <label>Đang Tắt tìm việc</label>
              </div>
              <div className="col-12">
                <p className="job-waiting-description">
                  Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý
                  nhiều hơn trong danh sách tìm kiếm của{" "}
                  <strong>Nhà Tuyển Dụng</strong>.
                </p>
              </div>
              <div className="col-12 switch-setting">
                <Switch
                  loading={loading}
                  checked={activeJobSearch}
                  onChange={(checked) =>
                    valueActivateChangeJobSearch(
                      checked,
                      setActiveJobSearch,
                      activeJobSearch,
                      setLoading
                    )
                  }
                />
                <label>Cho phép NTD tìm kiếm hồ sơ</label>
              </div>
              <div className="profile-active">
                <div className="description">
                  <p>
                    Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi
                    với bạn qua:
                  </p>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Nhắn tin trực tiếp trên GNOUD
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faCheck} />
                      Email và Số điện thoại của bạn
                    </li>
                  </ul>
                  <div className="banner">
                    <img src={banner2} alt="" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="col-12">
                <p className="job-waiting-description">
                  <span
                    style={{
                      border: "1px solid #ddd",
                      padding: "3px",
                      borderRadius: "50%",
                      width: "15px",
                      height: "15px",
                      fontSize: "9px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faInfo} />
                  </span>{" "}
                  Tạo một CV chất lượng để nâng cao khả năng thu hút sự chú ý
                  của nhà tuyển dụng và tăng tỷ lệ thành công lên đến 1000% so
                  với việc không có hồ sơ.
                </p>
              </div>
              <div className="col-12">
                <button className="button-gnoud">
                  <a href="#!">Tạo CV Profile</a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-left box-siderbar"
          style={{ margin: "20px 0 0 0" }}
        >
          <div className="box-employer">
            <div className="box-employer__header">
              <h4>Cv bạn đã đủ tốt?</h4>
              <p>Bao nhiêu NTD đang quan tâm và xem hồ sơ của bạn?</p>
            </div>
            <div className="box-employer__body row justify-content-around align-items-center">
              <div className="cv-count col-4">
                <div className="cv-count-box">
                  <p>0</p>
                  <p>lượt</p>
                </div>
              </div>
              <div className="cv-description col-8">
                <p>
                  Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần
                  hơn với công việc phù hợp.
                </p>
                <button className="button-gnoud">
                  <a href="#!">Khám phá ngay</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const MemoizedBoxSettings = React.memo(BoxSettings);
export default MemoizedBoxSettings;
