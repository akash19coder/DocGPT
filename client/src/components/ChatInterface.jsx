import React, { useEffect, useState } from "react";
import { ChatComponent } from "./ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TinyGradientFooter } from "./TinyGradientFooter";
import { addMessage } from "../utils/chatSlice";
import DocGPTIntro from "./DocGPTIntro";
import LoadingWave from "./LoadingWave";
// import PDFViewer from "./SleekPdfViewer";

const ChatInterface = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // if there is document, show chat component
  // else display - How can I help you today?

  const chat = useSelector((store) => store.chat.messages);
  console.log("i am chat", chat);
  const document = useSelector((store) => store.document?.messages);
  // console.log("i am documentid", documentId);
  const { id } = useParams();
  console.log("i am document id", id);

  const handleLoadingChange = (loadingStatus) => {
    setIsLoading(loadingStatus);
  };

  //TODO: it needs some optimizations...
  useEffect(() => {
    //api call and fetch history
    const fetchData = async () => {
      if (id === undefined || id === null) return;

      const data = await fetch(
        `http://localhost:3002/api/v1/chat/history/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const histories = await data.json();
      console.log(histories);
      //dispatch addMessages() action
      if (histories.data.length !== 0) {
        for (let i = 0; i < histories.data.length; i++) {
          dispatch(addMessage(histories.data[i]));
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col flex-grow">
      <main className="flex flex-row justify-evenly h-[75vh] flex-grow p-2 overflow-auto">
        {/* <PDFViewer /> */}
        <div className="relative z-0 h-max">
          {chat !== undefined && id !== undefined ? (
            <ChatComponent isLoading={isLoading} />
          ) : (
            <DocGPTIntro />
          )}
        </div>
      </main>
      <TinyGradientFooter id={id} onLoadingChange={handleLoadingChange} />
    </div>
  );
};

export default ChatInterface;
