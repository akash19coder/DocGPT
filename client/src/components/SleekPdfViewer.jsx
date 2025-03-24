"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import * as pdfJS from "pdfjs-dist";
// import pdfJSWorkerURL from "pdfjs-dist/build/pdf.worker?url";
// pdfJS.GlobalWorkerOptions.workerSrc = pdfJSWorkerURL;

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({
  url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  defaultScale = 1.0,
}) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(defaultScale);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError(error);
    setLoading(false);
  };

  const previousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "document.pdf";
    link.click();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      else if (e.key === "ArrowLeft") previousPage();
      else if (e.key === "+") zoomIn();
      else if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages]);

  return (
    <div className="flex flex-col h-full w-[30vw] bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousPage}
            disabled={pageNumber <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            {pageNumber} / {numPages || "?"}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={pageNumber >= (numPages || 1)}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <span className="text-sm w-16 text-center">
            {Math.round(scale * 100)}%
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={rotate}
            aria-label="Rotate"
          >
            <RotateCw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={downloadPDF}
            aria-label="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p className="font-medium">Error loading PDF</p>
            <p className="text-sm">{error.message}</p>
            <p className="text-xs mt-2">
              Please check that the URL is a valid PDF document.
            </p>
          </div>
        )}

        {!url && !loading && !error && (
          <div className="text-center text-gray-500">
            <p>No valid PDF URL provided.</p>
            <p className="text-sm">Please enter a valid PDF URL to view.</p>
          </div>
        )}

        {url && (
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="shadow-lg"
          >
            {numPages && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-lg"
              />
            )}
          </Document>
        )}
      </div>
    </div>
  );
}
