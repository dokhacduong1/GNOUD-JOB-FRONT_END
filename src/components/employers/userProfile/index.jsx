import { Button, Menu, Modal, Rate } from "antd";
import { useState } from "react";
import { infoUserProfile } from "../../../services/employers/jobsApi";
import { optionsSalary, optionsYearsOfExperience } from "./js/options";
import "./userProfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faMessage } from "@fortawesome/free-regular-svg-icons";
import InfoProfileUser from "./infoProfileUser";
import CvProfileUser from "./cvProfileUser";
import { useParams } from "react-router-dom";

function UserProfile({ record }) {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [selectedKeys, setSelectedKeys] = useState("info");
  const [linkCv, setLinkCv] = useState("");

  const {id} = useParams();
  const fetchApi = async () => {
    if (Object.keys(record).length > 0) {
      const objectNew = {
        idUser: record._id,
        idJob: id,
      };
      const result = await infoUserProfile(objectNew);

      if (result.code === 200) {
        if (result.data.desiredSalary) {
          result.data.desiredSalary = optionsSalary.find((item) =>
            item.value.includes(result.data.desiredSalary)
          ).label;
        }
        if (result.data.yearsOfExperience) {
          result.data.yearsOfExperience = optionsYearsOfExperience.find(
            (item) => item.value.includes(result.data.yearsOfExperience)
          ).label;
        }

        setUserProfileInfo(result.data);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    if (userProfileInfo?._id === record._id) return;

    fetchApi();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      label: "Thông tin",
      key: "info",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      label: "CV ứng viên",
      key: "cv_user",
      icon: <FontAwesomeIcon icon={faEye} />,
    },
  ];
  const handleChangeMenu = ({ key }) => {

    setSelectedKeys(key);
  };
  return (
    <>
      <button onClick={showModal}>Xem hồ sơ</button>
      <Modal
        style={{ top: "71px" }}
        open={isModalOpen}
        onOk={handleOk}
        width={1000}
        height={100}
        className="model-view-cv reset-button-employer"
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleCancel}>
            Đã xem
          </Button>,
        ]}
      >
        <div className="modal-user-profile no-font">
          <div className="row gx-6">
            <div className="col-4">
              <div className="left-item">
                <div className="box-image mb-3">
                  <img src={record?.avatar || ""} alt="avatar" />
                </div>
                <div className="item-1 mb-3">
                  <div className="line-spead mb-3">
                    <div>NEEDS WORK</div>
                    <div></div>
                  </div>
                  <div className="content">
                    <div className="mb-2">
                      Kinh nghiệm làm việc:{" "}
                      <span>
                        {userProfileInfo?.yearsOfExperience ||
                          "Thông tin chưa cập nhật"}
                      </span>
                      <p className="experience-info">
                        Vui lòng xem xét thông tin về kinh nghiệm làm việc của
                        ứng viên để giúp việc tuyển dụng của bạn trở nên dễ dàng
                        hơn.
                      </p>
                    </div>
                    <div>
                      Mức lương mong muốn:{" "}
                      <span>
                        {userProfileInfo?.desiredSalary ||
                          "Thông tin chưa cập nhật"}
                      </span>
                      <p>
                        Chúng tôi rất quan tâm đến mức lương mà ứng viên mong
                        muốn để đảm bảo sự phù hợp và hài lòng trong quá trình
                        làm việc.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="item-2">
                  <div className="line-spead mb-3">
                    <div>SKILLS</div>
                    <div></div>
                  </div>
                  <div className="content">
                    {userProfileInfo &&
                      userProfileInfo.skill_id &&
                      userProfileInfo.skill_id.map((item, index) => (
                        <div className="skill" key={index}>
                          {item.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="right-item">
                <div className="head-info mb-4">
                  <div className="adddress-name">
                    <h3>{userProfileInfo?.fullName}</h3>
                    <div>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>
                        {userProfileInfo?.address?.city.split("/")[1] ||
                          "Thông tin chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                  <div className="job_categorie_title">
                    {userProfileInfo?.job_categorie_id?.title ||
                      "Thông tin chưa cập nhật"}
                  </div>
                </div>
                <div className="body-info mb-4">
                  <div className="ranking mb-3">
                    <div className="title mb-2">AUTHENTICATION LEVEL</div>
                    <div className="content">
                      <span>{userProfileInfo?.authentication_level}.0</span>
                      <Rate
                        className="rate-rank"
                        style={{ color: "rgb(255 91 157) " }}
                        disabled
                        value={userProfileInfo?.authentication_level}
                      />
                    </div>
                  </div>
                  <div className="contact">
                    {record?.phone && record?.email ? (
                      <>
                        <div className="send-mess">
                          <FontAwesomeIcon icon={faMessage} />
                          <span>Gửi tin nhắn</span>
                        </div>
                        <div className="contacts">
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Đã mở liên hệ</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="no-send-mess">
                          <FontAwesomeIcon icon={faMessage} />
                          <span>Chưa mở liên hệ</span>
                        </div>
                        <div className="no-contacts">
                          <span>Chưa mở liên hệ</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="menu">
                  <Menu
                    onSelect={handleChangeMenu}
                    selectedKeys={selectedKeys}
                    className="menu-profile"
                    mode="horizontal"
                    items={items}
                  />
                  <div className="item-box">
                    {selectedKeys === "info" && (
                      <InfoProfileUser record={userProfileInfo} />
                    )}
                    {selectedKeys === "cv_user" && (
                      <CvProfileUser record={userProfileInfo}  setLinkCv={setLinkCv} linkCv={linkCv}/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default UserProfile;
