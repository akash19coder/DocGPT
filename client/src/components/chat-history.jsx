import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Edit, Trash2, FileText } from "lucide-react";

// Mock data for chat history
const mockChatHistory = [
  {
    id: 1,
    title: "AI Ethics Discussion",
    date: "2023-06-15",
    pdfName: "ethics.pdf",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    date: "2023-06-15",
    pdfName: "ml_basics.pdf",
  },
  {
    id: 3,
    title: "Natural Language Processing",
    date: "2023-06-14",
    pdfName: "nlp_intro.pdf",
  },
  {
    id: 4,
    title: "Computer Vision Applications",
    date: "2023-06-13",
    pdfName: "cv_apps.pdf",
  },
  {
    id: 5,
    title: "Reinforcement Learning",
    date: "2023-06-13",
    pdfName: "rl_overview.pdf",
  },
];

export function ChatHistory({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatHistory, setChatHistory] = useState(mockChatHistory);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const editInputRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditedTitle(title);
  };

  const handleDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setChatHistory((prevHistory) =>
        prevHistory.filter((chat) => chat.id !== deleteConfirmId)
      );
      setDeleteConfirmId(null);
    }
  };

  const handleSaveEdit = (id) => {
    setChatHistory((prevHistory) =>
      prevHistory.map((chat) =>
        chat.id === id ? { ...chat, title: editedTitle } : chat
      )
    );
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        if (editingId !== null) {
          handleSaveEdit(editingId);
        }
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [editingId, onClose]);

  const groupedHistory = chatHistory.reduce((groups, chat) => {
    const date = chat.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(chat);
    return groups;
  }, {});

  const filteredGroupedHistory = Object.entries(groupedHistory).reduce(
    (acc, [date, chats]) => {
      const filteredChats = chats.filter((chat) =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredChats.length > 0) {
        acc[date] = filteredChats;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search chat history..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-10"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            ESC
          </span>
        </div>
      </div>
      <Separator />
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {Object.entries(filteredGroupedHistory).map(([date, chats]) => (
          <div key={date} className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">{date}</h3>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <div className="flex items-center space-x-2 flex-grow">
                  {editingId === chat.id ? (
                    <Input
                      ref={editInputRef}
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, chat.id)}
                      onBlur={() => handleSaveEdit(chat.id)}
                      autoFocus
                      className="flex-grow"
                    />
                  ) : (
                    <>
                      <span className="text-gray-700 flex-grow">
                        {chat.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <FileText className="h-3 w-3" />
                        <span className="text-xs">{chat.pdfName}</span>
                      </Badge>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(chat.id, chat.title)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(chat.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <AlertDialog
        open={deleteConfirmId !== null}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this chat?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              chat from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
