import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoAvatarComponent } from "./LogoAvatarComponent";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

export function ChatComponent() {
  const history = useSelector((store) => store.chat.messages);

  console.log("i am history", history);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {history ? (
        history.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-2 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.role === "user" ? (
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={message.avatar}
                    alt={message?.username || "AS"}
                  />
                  <AvatarFallback>{message?.username || "AS"}</AvatarFallback>
                </Avatar>
              ) : (
                <LogoAvatarComponent />
              )}
              <div
                className={`${
                  message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                } rounded-lg p-3 max-w-xs sm:max-w-md`}
              >
                <p className="font-semibold text-sm mb-1">
                  {message?.username || "DocGPT"}
                </p>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Waiting for messages</div>
      )}
    </div>
  );
}
