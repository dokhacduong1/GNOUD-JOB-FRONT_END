import { useEffect, useState } from "react";

import LeftChatBox from "./leftChatBox";
import MidChatBox from "./midChatBox";
import RightChatBox from "./rightChatBox";
import "./chatBox.scss";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";
import { io } from "socket.io-client";

const checkTokenEmployer = getCookie("token-employer") || "";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function ChatBox() {
  const [idChat, setIdChat] = useState("");
  const [roomChat] = useState(useQuery().get("t") || "");
  const [socketEmployer, setSocketEmployer] = useState(null);

  //Kết nối socket với server
  useEffect(() => {
    if (roomChat === "") return;
    setSocketEmployer(
      io("http://localhost:2709", {
        auth: {
          token: checkTokenEmployer,
          role: "employer",
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
    <div className="chat-box ">
      <div className="row gx-0">
        <div className="col-3">
          <LeftChatBox />
        </div>
        <div className="col-6 reset-button-employer">
          <MidChatBox socket={socketEmployer}/>
        </div>
        <div className="col-3 reset-button-employer">
          <RightChatBox />
        </div>
      </div>
    </div>
  );
}
export default ChatBox;
