import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGoogleDrive } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

export function TinyGradientFooter() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const gradientButtons = [
    {
      text: "Simplifications",
      key: "simplify",
    },
    {
      text: "Summarize",
      key: "summarize",
    },
    {
      text: "Definition Search",
      key: "define",
    },
  ];

  const uploadOptions = [
    {
      text: "Upload from Google Drive",
      key: "drive",
      icon: <FaGoogleDrive />,
    },
    {
      text: "Upload from Notion",
      key: "notion",
      icon: <SiNotion />,
    },
    {
      text: "Upload from Microsoft Outlook",
      key: "outlook",
      icon: <PiMicrosoftOutlookLogoFill />,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-center space-x-3 mb-6">
        {gradientButtons.map((button) => (
          <button
            key={button.key}
            className={`px-2 py-0.5 rounded-full text-gray-800 text-xs font-medium 
                        bg-gradient-to-r from-pink-200 to-red-200
                        transition-all duration-300 ease-in-out
                        flex items-center space-x-1 border border-pink-300
                        ${
                          hoveredButton === button.key
                            ? "shadow-sm bg-gradient-to-r from-pink-300 to-red-300"
                            : "opacity-90"
                        }`}
            onMouseEnter={() => setHoveredButton(button.key)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <span>{button.text}</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span className="sr-only">Upload file</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Upload Source</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {uploadOptions.map((option) => (
                <Button
                  key={option.key}
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.text}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <Input className="flex-grow" placeholder="Type your message..." />
        <Button className="shrink-0">Send</Button>
      </div>
    </div>
  );
}
