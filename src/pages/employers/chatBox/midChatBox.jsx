import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./midChatBox.scss";
import { faFaceSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import { Form, Input, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import audioMp3 from "./mp3/tb.mp3";
import TypingIndicator from "../../../components/alls/Typing";
function MidChatBox({ socket, userData, contentChat, loadMore }) {
  
  const [idEmployer, setIdEmployer] = useState("");
  const [loading, setLoading] = useState(true);
  const boxChatAllRef = useRef(null);
  const [status, setStatus] = useState(
    userData?.statusOnline ? "Hoạt động" : "Dừng hoạt động"
  );
  const authenMainEmployer = useSelector(
    (data) => data.authenticationReducerEmployer
  );
  const [form] = Form.useForm();
  const typingTimer = useRef(null);
  const [typing, setTyping] = useState(false);
  const { idUser } = useParams();

  //Tạo state lưu trữ tin nhắn
  const [arrayChat, setArrayChat] = useState(contentChat);

  useEffect(() => {
    setArrayChat(contentChat);
  }, [contentChat]);

  //Check trang thái online offline khi vào trang
  useEffect(() => {
    setStatus(userData?.statusOnline ? "Hoạt động" : "Dừng hoạt động");
  }, [userData?.statusOnline, socket]);

  //Cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (boxChatAllRef.current) {
      boxChatAllRef.current.scrollTop = boxChatAllRef.current.scrollHeight;
    }
  }, [arrayChat]);

  //Nhận tin nhắn từ server
  useEffect(() => {
    if (idEmployer === "") return;
    if (!socket) return;

    //Hàm này check xem user có online hay không
    socket.on("SERVER_RETURN_REQUEST_ONLINE", (data) => {
      if (idUser === data?.user_id) {
        setStatus("Hoạt động");
      }
    });

    //Hàm này check xem user có offline hay không
    socket.on("SERVER_RETURN_REQUEST_OFFLINE", (data) => {
      if (idUser === data?.user_id) {
        setStatus("Dừng hoạt động");
      }
    });
    //Hàm này nhận tin nhắn từ server
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
      setArrayChat((prev) => [...prev, data]);
    });
    //Hàm này load thêm tin nhắn khi có tin nhắn mới tin nhắn mới nhất
    socket.on("SERVER_RETURN_REQUEST_LOADMORE", (data) => {
      const idCheck = data?.id_check;
      //Nếu mà hiện tại đang ở khung chat của đối phương thì sẽ đổi read = true luôn vì đang ở khung chat đối phương mà

      socket.emit("CLIENT_SEND_REQUEST_SEEN_CHAT", {
        idUser: idUser,
        idCheck: idCheck,
      });

      if (idEmployer !== idCheck) {
        const audio = new Audio(audioMp3);
        audio.play();
      }
      loadMore();
    });
    socket.on("SERVER_RETURN_TYPING", () => {
      setTyping(true);
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
      typingTimer.current = setTimeout(() => {
        setTyping(false);
      }, 3000);
    });

    setLoading(false);
    //Nếu mà component bị unmount thì sẽ xóa hết listener
    return () => {
      setTyping(false);
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      form.resetFields();
    }
  };
  const handleTyping = () => {
    socket.emit("CLIENT_SEND_TYPING");
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
            <img src={userData?.avatar} alt="avatar" />
          </div>
          <div className="info">
            <div className="name">{userData?.fullName}</div>
            <div
              className={`status ${
                status === "Hoạt động" ? "online" : "offline"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
      <div className="mid-chat__body ">
        <Spin spinning={loading}>
          <div className="box-chat-all p-3" ref={boxChatAllRef}>
            {arrayChat?.length > 0 &&
              arrayChat.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.user_id === idEmployer ? (
                      <div className="me mb-2 " style={{ textAlign: "end" }}>
                        <div className="content ">{item?.content}</div>
                      </div>
                    ) : (
                      <div
                        className="friend  mb-2"
                        style={{ textAlign: "left" }}
                      >
                        <div className="image ">
                          <img src={item?.avatar} alt="avatar" />
                        </div>
                        <div className="content ">{item?.content}</div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </Spin>
      </div>
      <div className="mid-chat__footer p-3">
        <TypingIndicator fullName={userData?.fullName} isTyping={typing} />
        <div className="input-chat row align-items-center">
          <div className="col-1">
            <div className="box-icon">
              <FontAwesomeIcon icon={faImage} />
              <FontAwesomeIcon icon={faFaceSmile} />
            </div>
          </div>

          <div className="col-11">
            <div className="box-input">
              <Form form={form} onFinish={handleSendChat} layout="inline">
                <Form.Item name="content" style={{ flex: "1" }}>
                  <Input onChange={handleTyping} placeholder="Aa" />
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
