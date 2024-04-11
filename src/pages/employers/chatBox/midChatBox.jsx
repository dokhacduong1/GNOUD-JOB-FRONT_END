import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./midChatBox.scss";

import { faFaceSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import { Form, Input, Spin } from "antd";
// import { socketEmployer } from "../../../../socket";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



function MidChatBox({socket}) {
  const [idEmployer, setIdEmployer] = useState("");
  const [loading, setLoading] = useState(true);
  

  const authenMainEmployer = useSelector(
    (data) => data.authenticationReducerEmployer
  );
  //Tạo state lưu trữ tin nhắn
  const [arrayChat, setArrayChat] = useState([]);

  

 
  //Nhận tin nhắn từ server
  useEffect(() => {
    if (idEmployer === "") return;
    if (!socket) return;
    setLoading(false);
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
      console.log(data);
      setArrayChat((prev) => [...prev, data]);
    });
  }, [idEmployer, socket]);

  useEffect(() => {
    if (authenMainEmployer?.status) {
      const { infoUserEmployer } = authenMainEmployer;
      setIdEmployer(infoUserEmployer?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenMainEmployer?.infoUserEmployer?.id]);

  //Gửi tin nhắn đi
  const handleSendChat = (value) => {
    const { content } = value;
    if (!socket) return;
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
    }
  };

  return (
    <div className="mid-chat  ">
      <div className="mid-chat__slogan p-3 mb-1">
        <div className="content">
          Embrace a fresh approach to <span>pursue your opportunities</span>.
        </div>
      </div>
      <div className="mid-chat__header p-3">
        <div className="box-info">
          <div className="image">
            <img
              src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/434329416_829884792513495_3431549589345019988_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_nFlRQmPudMAb7BztxD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan5-10.fna&oh=00_AfDJ5xSdEU3HYKykmYbRdVnsnwb0g0Gna9qh5jpUdVguOw&oe=66183F99"
              alt="avatar"
            />
          </div>
          <div className="info">
            <div className="name">Trang Ái Như</div>
            <div className="status online">Hoạt động</div>
          </div>
        </div>
      </div>
      <div className="mid-chat__body ">
        <Spin spinning={loading}>
          <div className="box-chat-all p-3">
            {arrayChat?.length > 0 &&
              arrayChat.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.user_id === idEmployer ? (
                      <div className="me mb-2" style={{ textAlign: "end" }}>
                        <div className="content">{item?.content}</div>
                      </div>
                    ) : (
                      <div
                        className="friend mb-2"
                        style={{ textAlign: "left" }}
                      >
                        <div className="image">
                          <img
                            src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-1/434329416_829884792513495_3431549589345019988_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_nFlRQmPudMAb7BztxD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan5-10.fna&oh=00_AfDJ5xSdEU3HYKykmYbRdVnsnwb0g0Gna9qh5jpUdVguOw&oe=66183F99"
                            alt="avatar"
                          />
                        </div>
                        <div className="content">{item?.content}</div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </Spin>
      </div>
      <div className="mid-chat__footer p-3">
        <div className="input-chat row align-items-center">
          <div className="col-1">
            <div className="box-icon">
              <FontAwesomeIcon icon={faImage} />
              <FontAwesomeIcon icon={faFaceSmile} />
            </div>
          </div>
          <div className="col-11">
            <div className="box-input">
              <Form onFinish={handleSendChat} layout="inline">
                <Form.Item name="content" style={{ flex: "1" }}>
                  <Input placeholder="Aa" />
                </Form.Item>
                <Form.Item>
                  <button type="submit">Gửi</button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MidChatBox;
