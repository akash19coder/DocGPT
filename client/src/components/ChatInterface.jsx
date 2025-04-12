import React, { useEffect, useState } from "react";
import { ChatComponent } from "./ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TinyGradientFooter } from "./TinyGradientFooter";
import { addMessage } from "../utils/chatSlice";
import DocGPTIntro from "./DocGPTIntro";
import LoadingWave from "./LoadingWave";
import PDFViewer from "./SleekPdfViewer";
import { BASE_URL } from "../utils/constant";
import { FileText } from "lucide-react";

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

      const data = await fetch(`${BASE_URL}/api/v1/chat/history/${id}`, {
        method: "GET",
        credentials: "include",
      });

      const histories = await data.json();
      console.log(histories);
      //dispatch addMessages() action
      if (histories.data && histories.data.length !== 0) {
        for (let i = 0; i < histories.data.length; i++) {
          dispatch(addMessage(histories.data[i]));
        }
      }
    };
    fetchData();
  }, [id, dispatch]);

  return (
    <div className="flex flex-col h-[90vh]">
      <main className="flex-grow p-2 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 relative z-0">
          {chat !== undefined && id !== undefined ? (
            <>
              <div className="w-full md:w-1/2">
                <div className="hidden md:block h-full">
                  <PDFViewer pdfUrl={document?.cloudinary_url || ""} />
                </div>
                <div className="block md:hidden p-3 text-center border border-gray-300 rounded-lg mb-4 bg-gray-50 shadow-sm">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    {document?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {"Current Document"}
                  </p>
                  {document?.cloudinary_url && (
                    <a
                      href={document.cloudinary_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs text-blue-600 hover:underline"
                    >
                      Open PDF
                    </a>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <ChatComponent isLoading={isLoading} />
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center items-center h-full">
              <DocGPTIntro />
            </div>
          )}
        </div>
      </main>
      <TinyGradientFooter id={id} onLoadingChange={handleLoadingChange} />
    </div>
  );
};

export default ChatInterface;
