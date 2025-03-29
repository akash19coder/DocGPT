import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquarePlus,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UserProfileModal } from "../hooks/user-profile-modal";
import { ChatHistory } from "./ChatHistory";

export function SidebarComponent() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyRef = useRef(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false);
      }
    };

    if (isHistoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHistoryOpen]);

  return (
    <>
      <div
        className={`
        flex flex-col h-screen bg-gray-800 text-white
        transition-all duration-300 ease-in-out
        ${isExpanded && "w-64 h-max"}
      `}
      >
        <div className="p-4 flex items-center justify-between">
          {isExpanded && <h2 className="text-xl font-bold">Menu</h2>}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700"
            onClick={toggleSidebar}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex-grow p-4 space-y-4">
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-gray-700 ${
              !isExpanded && "justify-center"
            }`}
          >
            <MessageSquarePlus className="h-5 w-5 mr-2" />
            {isExpanded && <span>New Chat</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-gray-700 ${
              !isExpanded && "justify-center"
            }`}
            onClick={toggleHistory}
          >
            <History className="h-5 w-5 mr-2" />
            {isExpanded && <span>History</span>}
          </Button>
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-gray-700 ${
              !isExpanded && "justify-center"
            }`}
            onClick={openProfileModal}
          >
            <Settings className="h-5 w-5 mr-2" />
            {isExpanded && <span>Settings</span>}
          </Button>
        </div>
      </div>

      {isHistoryOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={historyRef} className="bg-white rounded-lg p-4">
            <ChatHistory />
          </div>
        </div>
      )}

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </>
  );
}
