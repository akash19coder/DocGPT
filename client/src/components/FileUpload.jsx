"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, X, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { cn } from "../lib/utils";

export function FileUploadModal({
  isOpen,
  onClose,
  fileName = "document.pdf",
  fileSize = 2.4,
  uploadStatus,
  uploadProgress = 0,
  errorMessage = "An error occurred during upload",
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
          <h3 className="text-lg font-medium">
            {uploadStatus === "success"
              ? "Upload Complete"
              : uploadStatus === "error"
              ? "Upload Failed"
              : "Uploading File"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          {uploadStatus === "success" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative mb-4">
                <CheckCircle className="h-16 w-16 text-green-500 animate-in zoom-in duration-300" />
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {fileName} ({fileSize} MB) has been successfully uploaded
              </p>
            </div>
          )}

          {uploadStatus === "error" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative mb-4">
                <AlertCircle className="h-16 w-16 text-red-500 animate-in zoom-in duration-300" />
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {errorMessage}
              </p>
            </div>
          )}

          {(uploadStatus === "uploading" || uploadStatus === "idle") && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {fileSize} MB
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {Math.round(uploadProgress)}%
                </div>
              </div>

              <Progress value={uploadProgress} className="h-1.5" />

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {uploadProgress < 100 ? "Uploading..." : "Processing..."}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t dark:border-gray-800">
          {uploadStatus === "success" ? (
            <Button onClick={onClose}>Done</Button>
          ) : uploadStatus === "error" ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default">Retry</Button>
            </div>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
