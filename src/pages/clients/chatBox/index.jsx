import { useEffect, useState } from "react";

import LeftChatBox from "./leftChatBox";
import MidChatBox from "./midChatBox";
import RightChatBox from "./rightChatBox";
import "./chatBox.scss";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { io } from "socket.io-client";
const checkTokenClient = getCookie("token-user") || "";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChatBoxClient() {
  const [idChat, setIdChat] = useState("");
  const [socketClient, setSocketClient] = useState(null);
  const [roomChat] = useState(useQuery().get('t') || "");

  //Kết nối socket với server
  useEffect(() => {
    if (roomChat === "") return;
    setSocketClient(
      io("http://localhost:2709", {
        auth: {
          token: checkTokenClient,
          role: "client",
          roomChat: roomChat,
        },
      })
    );
  }, [roomChat]);

  //Lấy id chat từ url
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const myParamId = params.get("t");
    if (myParamId) {
      setIdChat(myParamId);
    } else {
      setIdChat("");
    }
  }, [idChat]);

  return (
    <div className="chat-box-client">
      <div className="row gx-0">
        <div className="col-3">
          <LeftChatBox />
        </div>
        <div className="col-6 reset-button-employer">
          <MidChatBox socket={socketClient}/>
        </div>
        <div className="col-3 reset-button-employer">
          <RightChatBox />
        </div>
      </div>
    </div>
  );
}
export default ChatBoxClient;
