import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from "lucide-react";

export default function PDFViewer({
  pdfUrl = "https://res.cloudinary.com/dmyjhicsl/raw/upload/v1742982410/67da7e472b83d2e7da95bc75/Coding%20Task.pdf",
  defaultScale = 1.0,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(defaultScale);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error) {
    console.error("Error loading PDF:", error);
    setLoadError(true);
    setIsLoading(false);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return newPageNumber >= 1 && newPageNumber <= (numPages || 1)
        ? newPageNumber
        : prevPageNumber;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  }

  function handleRotate() {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  }

  function downloadPDF() {
    // Create a link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {/* Controls */}
      {!loadError && (
        <div className="sticky top-0 z-10 bg-background border-b p-2 mb-4">
          <div className="flex flex-wrap gap-1 justify-between items-center">
            <div className="flex items-center gap-2">
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={zoomOut}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>

              <div className="w-24 hidden sm:block">
                <Slider
                  value={[scale * 100]}
                  min={50}
                  max={300}
                  step={10}
                  onValueChange={(value) => setScale(value[0] / 100)}
                  aria-label="Zoom level"
                />
              </div>

              <span className="text-xs w-12 text-center">
                {Math.round(scale * 100)}%
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={zoomIn}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleRotate}
                aria-label="Rotate document"
              >
                <RotateCw className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={downloadPDF}
                aria-label="Download PDF"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Document or Fallback */}
      <div className="flex justify-center overflow-auto">
        {loadError ? (
          <h1>Error Loading Document</h1>
        ) : (
          <Document
            file={{
              url: pdfUrl,
              httpHeaders: {
                "Access-Control-Allow-Origin": "*",
              },
              withCredentials: false,
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="py-12 text-center">Loading document...</div>
            }
            error={
              <div className="py-12 text-center text-red-500">
                Failed to load PDF document.
              </div>
            }
            className="border rounded-lg shadow-sm"
          >
            {isLoading ? (
              <div className="h-[600px] w-[450px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-auto max-h-[calc(100vh-150px)]">
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={scale}
                    rotate={rotation}
                    width={isMobile ? window.innerWidth - 40 : undefined}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mb-4"
                  />
                ))}
              </div>
            )}
          </Document>
        )}
      </div>
    </div>
  );
}
