import React from "react";
import { ChatComponent } from "./ChatComponent";

const ChatInterface = () => {
  return (
    <main className="flex flex-row justify-evenly flex-grow p-6 overflow-auto">
      {/* Chat messages would go here
    {/* <SleekPdfViewer /> */}
      <div className="relative z-0">
        <ChatComponent />
      </div>
    </main>
  );
};

export default ChatInterface;
