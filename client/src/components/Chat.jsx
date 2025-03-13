"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarMenu } from "./AvatarMenu";
import { FileUp, Send } from "lucide-react";
import { LogoComponent } from "./LogoComponent";
import { SidebarComponent } from "./SidebarComponent";
import { ChatComponent } from "./ChatComponent";
import { LogoWithDropdownComponent } from "./LogoWithDropdownComponent";
import { SleekPdfViewer } from "./SleekPdfViewer";
import { TinyGradientFooter } from "./TinyGradientFooter";
import { MainComponent } from "./MainComponent";

//              Chat()
export function Chat() {
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
