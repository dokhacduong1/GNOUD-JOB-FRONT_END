/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import LeftChatBox from "./leftChatBox";
import MidChatBox from "./midChatBox";
import RightChatBox from "./rightChatBox";
import "./chatBox.scss";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { io } from "socket.io-client";

import { fetchApi, loadMore } from "./js";

const checkTokenEmployer = getCookie("token-employer") || "";

function ChatBox() {
  const [socketEmployer, setSocketEmployer] = useState(null);
  const [userData, setUserData] = useState({});
  const [contentChat, setContentChat] = useState([]);
  const [historyChat, setHistoryChat] = useState([]);
  const { idUser } = useParams();


  useEffect(() => {
    
    fetchApi(setUserData, setContentChat, setHistoryChat, idUser);

  }, [idUser]);

  //Kết nối socket với server
  useEffect(() => {
   
    if(socketEmployer){
      //Phải disconnect socket cũ trước khi tạo socket mới
     
      socketEmployer.disconnect();
    }
    setSocketEmployer(
      io("https://project-duong-vip-api.vercel.app", {
        auth: {
          token: checkTokenEmployer,
          role: "employer",
          idUser: idUser,
        },
      })
    );
      loadMore(setHistoryChat);
  }, [idUser]);

  return (
    <div className="chat-box ">
      <div className="row gx-0">
        <div className="col-3">
          <LeftChatBox  idUser={idUser}  historyChat = {historyChat}/>
        </div>
        <div className="col-6 reset-button-employer">
          <MidChatBox
            loadMore= {()=>{loadMore(setHistoryChat)}}
            contentChat={contentChat}
            userData={userData}
            socket={socketEmployer}
          />
        </div>
        <div className="col-3 reset-button-employer">
          <RightChatBox />
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
