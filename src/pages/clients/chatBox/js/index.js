import { getContentChatClient, getHistoryChatClient } from "../../../../services/clients/chatApi";
import { getCvInfoUserClient } from "../../../../services/clients/cvsApi";


export const fetchApi = async (setUserData,setContentChat, setHistoryChat,setTypeRoom,idUser) => {
  const promises = [
    getCvInfoUserClient(idUser),
    getContentChatClient(idUser),
    getHistoryChatClient(),
  ];

  const [resultCvInfoUserClient,resultContentChatClient, resultHistoryChatClient] = await Promise.all(promises);
  
  if (resultContentChatClient.code === 200) {
    setContentChat(resultContentChatClient.data);
    setTypeRoom(resultContentChatClient.typeRoom)
  }
  if (resultHistoryChatClient.code === 200) {
   
    setHistoryChat(resultHistoryChatClient.data);
  }
  if (resultCvInfoUserClient.code === 200) {
   
    setUserData(resultCvInfoUserClient.data);
  }
};

export const loadMore = async (setHistoryChat) => {
    const result = await getHistoryChatClient();
    if (result.code === 200) {
        setHistoryChat(result.data);
    }
}