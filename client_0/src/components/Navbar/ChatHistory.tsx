import { TiMessage } from "react-icons/ti";
import { fetchAllChats } from "../../helpers/api-communicator";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ChatItem = ({ title, chatID }: { title: string, chatID: string }) => {
  return (
    <div>
      <TiMessage style={{ width: '22px', height: '22px' }} />

      <a href={`/chat/${chatID}`} > {title} </a>
    </div>
  )
}

const ChatHistory = () => {
  const [chatHistoryTitle, setChatHistoryTitle] = useState<object[]>([]);
  const reversedChatHistoryTitle = chatHistoryTitle.slice().reverse();

  useEffect(() => {
    fetchAllChats().then((data) => {
      setChatHistoryTitle(data.data.allChat);
    });
  }, []);

  return (
    <div className='flex-item-0-item-1'>
      {reversedChatHistoryTitle.length === 0 ? (
        <div className="no-chat-history">
          <p className="icon"><FaExclamationCircle/></p>
          <p className="message">Initiate chat to see history here</p>
        </div>
      ) : (
        reversedChatHistoryTitle.map((item) => {
          return (
            <ChatItem key={item.chatID} title={item.title} chatID={item.chatID} />
          );
        })
      )}
    </div>
  )
}

export default ChatHistory
