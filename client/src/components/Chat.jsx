import { useState } from "react";
import { SidebarComponent } from "./SidebarComponent";
import { MainComponent } from "./MainComponent";

//              Chat()
export default function Chat() {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent />

      {/* <MainComponent/> */}

      {/* <Header/> */}
      <MainComponent />
      {/* Footer with file upload and message input */}
    </div>
  );
}
