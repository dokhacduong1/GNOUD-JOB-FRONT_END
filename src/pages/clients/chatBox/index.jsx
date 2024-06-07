import { useEffect, useState } from "react";

import LeftChatBox from "./leftChatBox";
import MidChatBox from "./midChatBox";
import RightChatBox from "./rightChatBox";
import "./chatBox.scss";

import { getCookie } from "../../../helpers/cookie";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import { fetchApi, loadMore } from "./js";
const checkTokenClient = getCookie("token-user") || "";

function ChatBoxClient() {
  const [socketClient, setSocketClient] = useState(null);
  const [userData, setUserData] = useState({});
  const [contentChat, setContentChat] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);
  const [typeRoom, setTypeRoom] = useState("friend");
  const { idUser } = useParams();

  useEffect(() => {
  
    fetchApi(setUserData,setContentChat, setHistoryChat,setTypeRoom, idUser );
  }, [idUser]);

  //Kết nối socket với server
  useEffect(() => {
    if (socketClient) {
      //Phải disconnect socket cũ trước khi tạo socket mới
     
      socketClient?.disconnect();
    }
    setSocketClient(
      io("https://project-duong-vip-api.vercel.app", {
        auth: {
          token: checkTokenClient,
          role: "client",
          idUser: idUser,
        },
      })
    );
    loadMore(setHistoryChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser]);

  return (
    <div className="chat-box-client">
      <div className="row gx-0">
        <div className="col-3">
          <LeftChatBox  idUser={idUser}  historyChat = {historyChat}/>
        </div>
        <div className="col-6 reset-button-employer">
          <MidChatBox
            loadMore={() => {
              loadMore(setHistoryChat);
            }}
            typeRoom={typeRoom}
            contentChat={contentChat}
            userData={userData}
            socket={socketClient}
          />
        </div>
        <div className="col-3 reset-button-employer">
          <RightChatBox />
        </div>
      </div>
    </div>
  );
}
export default ChatBoxClient;
