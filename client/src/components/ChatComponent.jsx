"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoAvatarComponent } from "./LogoAvatarComponent";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import LoadingWave from "./LoadingWave";
import ReactMarkdown from "react-markdown";

export function ChatComponent({ isLoading }) {
  // Fallback state for when Redux is not available
  const [fallbackMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);

  // State to hold messages, initialized with fallback
  const [messages, setMessages] = useState(fallbackMessages);
  const chatRef = useRef();
  // Attempt to get messages from Redux
  let storeMessages;
  try {
    storeMessages = useSelector((store) => store?.chat?.messages);
  } catch (error) {
    console.log("Redux not available, using fallback messages");
    storeMessages = null;
  }

  // Use useEffect to update messages when storeMessages changes
  useEffect(() => {
    if (storeMessages && storeMessages.length > 0) {
      setMessages(storeMessages);
    } else {
      setMessages(fallbackMessages);
    }
  }, [storeMessages, fallbackMessages]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <Card className="w-max mx-auto border border-gray-200 shadow-md rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LogoAvatarComponent />
            <div>
              <h3 className="font-bold text-lg">DocGPT Chat</h3>
              <p className="text-xs opacity-80">AI-powered conversation</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-transparent text-white border-white/50"
          >
            {messages?.length || 0} messages
          </Badge>
        </div>
      </CardHeader>

      <CardContent
        ref={chatRef}
        className="p-4 bg-white min-h-[400px] max-h-[400px] overflow-y-auto"
      >
        {messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-3 ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {message.role === "user" ? (
                    <Avatar className="w-10 h-10 border border-gray-300">
                      <AvatarImage
                        src={message.avatar}
                        alt={message?.username || "User"}
                      />
                      <AvatarFallback className="bg-gray-100 text-gray-800">
                        {message?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-10 h-10 border border-gray-300">
                      <LogoAvatarComponent />
                    </Avatar>
                  )}
                  <div
                    className={`${
                      message.role === "user"
                        ? "bg-black text-white"
                        : "bg-white border border-gray-300"
                    } rounded-lg p-3 max-w-xs sm:max-w-md`}
                  >
                    <p className="font-semibold text-sm mb-1">
                      {message?.username || "DocGPT"}
                    </p>
                    <p className="text-sm">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </p>
                    <div className="text-xs mt-2 opacity-70 text-right">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3">
                  <LoadingWave dotCount={3} dotSize="sm" color="muted" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-6 rounded-lg bg-white border border-dashed border-gray-300">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="text-lg font-medium text-gray-900">
                No messages yet
              </h3>
              <p className="text-gray-500 text-sm">
                Start a conversation to see messages here
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-500 w-full text-center">
          Messages are end-to-end encrypted and secure
        </div>
      </CardFooter>
    </Card>
  );
}
