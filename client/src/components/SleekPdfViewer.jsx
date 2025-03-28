"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ZoomIn, ZoomOut, RotateCw, FileWarning, Download } from "lucide-react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({
  pdfUrl = "https://res.cloudinary.com/dmyjhicsl/raw/upload/v1742982410/67da7e472b83d2e7da95bc75/Coding%20Task.pdf",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError(new Error("Failed to load PDF"));
    setIsLoading(false);
  };

  // Apply zoom and rotation using CSS transform
  const getTransformStyle = () => {
    return {
      transform: `scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: "center center",
      transition: "transform 0.2s ease",
    };
  };

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
  }

  function rotate() {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }

  return (
    <Card className={`flex flex-col h-full overflow-hidden ${className}`}>
      <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto relative flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10"></div>
          )}

          {error ? (
            <div className="flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <FileWarning className="h-12 w-12 mb-4 text-destructive" />
              <h3 className="text-lg font-medium mb-2">Failed to load PDF</h3>
              <p className="max-w-md mb-4">
                There was an error loading the PDF document. Please try again or
                check if the file is accessible.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open(pdfUrl, "_blank")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              style={{
                maxHeight: "calc(100vh - 200px)",
              }}
            >
              <div className="w-full h-full" style={getTransformStyle()}>
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(pdfUrl, "_blank")}
              className="flex items-center gap-2 text-xs sm:text-sm"
              aria-label="Open PDF in new tab"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Open PDF</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 0.6 || error !== null}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <span className="text-sm whitespace-nowrap">
              {Math.round(scale * 100)}%
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 3 || error !== null}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={rotate}
              disabled={error !== null}
              aria-label="Rotate"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfViewer;
