import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./leftChatBox.scss";
import {

  MailOutlined,

} from "@ant-design/icons";
import logo from "./images/logo.png";
import { Input, Menu } from "antd";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
function LeftChatBox() {
  const items = [
    {
      label: "Tất cả",
      key: "all",
      icon: <MailOutlined />,
    },
    {
      label: "Chưa đọc",
      key: "unread",
      icon: <FontAwesomeIcon icon={faEye} />,
    },
  ];
  return (
    <div className="left-chat-client px-1 pt-2">
      <div className="left-chat-client__header mb-3">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="settings">
          <Link to={"/"}>Về trang chủ</Link>
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
      <div className="left-chat-client__search mb-3">
        <div className="search p-1 mx-1">
          <Input
            style={{ width: "100%" }}
            size="large"
            prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          ></Input>
        </div>
      </div>
      <div className="left-chat-client__feedback mb-3">
        <div className="send-feedback p-3 mx-1 mt-2 mb-3">
          <span className="content-feed">
            <strong>Bạn đánh giá trải nghiệp của mình với GNOUD thế nào</strong>{" "}
            Chia sẻ ngay với đội ngũ phát triển để chúng tôi cải thiện trải
            nghiệm của tính năng cho phù hợp.
          </span>
          <button className="button-feed btn mt-3 w-100">Gửi phản hồi</button>
        </div>
      </div>
      <div className="left-chat-client__sending">
        <div className="p-1 mx-1">
          <div className="memu-sending mb-3">
            <Menu mode="horizontal" items={items} />
          </div>
          <div className="menu-chat">
            <div className="chat-box mb-2 active">
              <div className="logo-chat">
                <img
                  src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/434329416_829884792513495_3431549589345019988_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_nFlRQmPudMAb7BztxD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan5-10.fna&oh=00_AfDJ5xSdEU3HYKykmYbRdVnsnwb0g0Gna9qh5jpUdVguOw&oe=66183F99"
                  alt=""
                />
              </div>
              <div className="content-chat">
                <div className="name">Trang Ái Như</div>
                <div className="demo">Bạn: Unread</div>
              </div>
            </div>
            <div className="chat-box">
              <div className="logo-chat">
                <img
                  src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/434329416_829884792513495_3431549589345019988_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_nFlRQmPudMAb7BztxD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan5-10.fna&oh=00_AfDJ5xSdEU3HYKykmYbRdVnsnwb0g0Gna9qh5jpUdVguOw&oe=66183F99"
                  alt=""
                />
              </div>
              <div className="content-chat">
                <div className="name">Trang Ái Như</div>
                <div className="demo">Bạn: Unread</div>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeftChatBox;
