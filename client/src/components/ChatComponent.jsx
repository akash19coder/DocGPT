import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { LogoAvatarComponent } from "./LogoAvatarComponent";

const messages = [
  {
    isUser: true,
    avatar: "https://github.com/shadcn.png",
    username: "John Doe",
    content: "Hey DocGPT, can you explain quantum computing in simple terms?",
    type: "normal",
  },
  {
    isUser: false,
    avatar: "/docgpt-logo.png",
    username: "DocGPT",
    content:
      "Quantum computing is like having a super-powerful calculator that can perform many calculations simultaneously. Instead of using bits (0s and 1s) like regular computers, quantum computers use quantum bits or 'qubits'. These qubits can exist in multiple states at once, allowing quantum computers to solve complex problems much faster than traditional computers. This technology has the potential to revolutionize fields like cryptography, drug discovery, and financial modeling.",
    type: "normal",
  },
  {
    isUser: true,
    avatar: "https://github.com/shadcn.png",
    username: "John Doe",
    content: "Can you simplify your explanation of quantum computing?",
    type: "simplification",
  },
  {
    isUser: false,
    avatar: "/docgpt-logo.png",
    username: "DocGPT",
    content:
      "Quantum computing is like having a very smart helper that can do many math problems at once. Normal computers use simple yes/no answers, but quantum computers can use maybe answers too. This makes them really good at solving hard puzzles. People think quantum computers will help make better medicines, keep secrets safe, and help with money stuff.",
    type: "simplification",
  },
  {
    isUser: true,
    avatar: "https://github.com/shadcn.png",
    username: "John Doe",
    content: "Can you summarize the key points about quantum computing?",
    type: "summarization",
  },
  {
    isUser: false,
    avatar: "/docgpt-logo.png",
    username: "DocGPT",
    content:
      "• Quantum computers use qubits instead of classical bits\n• Qubits can exist in multiple states simultaneously\n• This allows for faster solving of complex problems\n• Potential applications in cryptography, drug discovery, and finance",
    type: "summarization",
  },
];

export function ChatComponent() {
  const [typedMessages, setTypedMessages] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typedMessages.length < messages.length) {
        setTypedMessages((prev) => [...prev, messages[prev.length]]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [typedMessages]);

  const renderContent = (message) => {
    switch (message.type) {
      case "definition":
        const definitions = JSON.parse(message.content);
        return (
          <ul className="list-disc pl-5 space-y-2">
            {Object.entries(definitions).map(([term, definition], index) => (
              <li key={index}>
                <span className="font-semibold">{term}:</span> {definition}
              </li>
            ))}
          </ul>
        );
      case "simplification":
      case "summarization":
        return message.content; // Return as string for TypeAnimation
      default:
        return message.content; // Return as string for TypeAnimation
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleLike = (index) => {
    setTypedMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, liked: true } : msg))
    );
  };

  const handleUnlike = (index) => {
    setTypedMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, liked: false } : msg))
    );
  };

  return (
    <TooltipProvider>
      <div className=" max-w-2xl mx-auto p-4 space-y-4">
        {typedMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex ${
                message.isUser ? "flex-row-reverse" : "flex-row"
              } items-start space-x-2 ${
                message.isUser ? "space-x-reverse" : ""
              }`}
            >
              {message.isUser ? (
                <Avatar className="w-10 h-10">
                  <AvatarImage src={message.avatar} alt={message.username} />
                  <AvatarFallback>{message.username[0]}</AvatarFallback>
                </Avatar>
              ) : (
                <LogoAvatarComponent />
              )}
              <div
                className={`${
                  message.isUser ? "bg-blue-100" : "bg-gray-100"
                } rounded-lg p-3 max-w-xs sm:max-w-md relative group`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-sm">{message.username}</p>
                  {!message.isUser && message.type !== "normal" && (
                    <Badge variant="outline" className="text-xs">
                      {message.type}
                    </Badge>
                  )}
                </div>
                {message.isUser ? (
                  renderContent(message)
                ) : (
                  <div
                    className={`text-sm ${
                      index === typedMessages.length - 1 ? "animate-pulse" : ""
                    }`}
                  >
                    <TypeAnimation
                      sequence={[renderContent(message)]}
                      wrapper="div"
                      speed={50}
                      style={{ display: "inline-block" }}
                    />
                  </div>
                )}
                {!message.isUser && (
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(message.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleLike(index)}
                          className={message.liked ? "text-green-500" : ""}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Like</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUnlike(index)}
                          className={
                            message.liked === false ? "text-red-500" : ""
                          }
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unlike</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
