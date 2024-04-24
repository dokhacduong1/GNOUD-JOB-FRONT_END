import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./leftChatBox.scss";
import { MailOutlined } from "@ant-design/icons";
import logo from "./images/logo.png";
import { Input, Menu } from "antd";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
function LeftChatBox({ historyChat, idUser }) {
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
            {historyChat.map((item, index) => (
              <div key={index}>
                {(item?.lastMessage || item?.typeRoom === "group") && (
                  <div>
                    <Link
                      to={`/chat-box/t/${item?.user_id}`}
                      key={index}
                      className={`chat-box mb-2 ${
                        item?.user_id === idUser && "active"
                      }`}
                    >
                      <div className="logo-chat">
                        <img src={item?.avatar} alt="" />
                      </div>
                      <div className="content-chat">
                        <div className="name">
                          <span>{item?.fullName}</span>
                        </div>
                        <div className="demo">
                          {item?.user_id !== item?.idUserChat && "Bạn: "}
                          <span
                            className={`${item?.unreadCount > 0 && "noo-seen"}`}
                          >
                            {item?.lastMessage}
                          </span>
                        </div>
                      </div>
                      {item?.unreadCount > 0 && (
                        <div className="no-seen">
                          <div></div>
                        </div>
                      )}
                      {item?.typeRoom === "group" && (
                        <div className="type-room group">GROUP</div>
                      )}
                      {item?.typeRoom === "friend" && (
                        <div className="type-room friend">EMPLOYER</div>
                      )}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeftChatBox;
