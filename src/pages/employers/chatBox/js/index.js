import { getContentChat, getHistoryChat } from "../../../../services/employers/chatApi";
import { getCvInfoUser } from "../../../../services/employers/cvsApi";

export const fetchApi = async (setUserData, setContentChat, setHistoryChat, idUser) => {
  const promises = [
    getCvInfoUser(idUser),
    getContentChat(idUser),
    getHistoryChat()
  ];

  const [resultCvInfoUser, resultContentChat, resultHistoryChat] = await Promise.all(promises);

  if (resultCvInfoUser.code === 200) {
    setUserData(resultCvInfoUser.data);
  }
  if (resultContentChat.code === 200) {
    setContentChat(resultContentChat.data);
  }
  if (resultHistoryChat.code === 200) {
    setHistoryChat(resultHistoryChat.data);
  }
};

export const loadMore = async (setHistoryChat) => {
    const result = await getHistoryChat();
    if (result.code === 200) {
   
        setHistoryChat(result.data);
    }
}