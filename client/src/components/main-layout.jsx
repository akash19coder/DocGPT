"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarMenu } from "./avatar-menu";
import { FileUp, Send } from "lucide-react";
import { LogoComponent } from "./logo-component";
import { SidebarComponent } from "./sidebar";
import { ChatComponent } from "./chat-component";
import { LogoWithDropdownComponent } from "./logo-with-dropdown";
import { SleekPdfViewer } from "./sleek-pdf-viewer";
import { TinyGradientFooter } from "./tiny-gradient-footer";

export function MainLayoutComponent() {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent />
      <div className="flex flex-col flex-grow">
        {/* Header */}

        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            <LogoWithDropdownComponent width={150} height={50} />
          </h1>
          <AvatarMenu />
        </header>

        {/* Main content area */}
        <main className="flex flex-row justify-evenly flex-grow p-6 overflow-auto">
          {/* Chat messages would go here
          {/* <SleekPdfViewer /> */}
          <div className="relative z-0">
            <ChatComponent />
          </div>
        </main>
        <TinyGradientFooter />
        {/* Footer with file upload and message input */}
      </div>
    </div>
  );
}
