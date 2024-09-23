"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import QuantumPdf from "../assets/Quantum.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function SleekPdfViewer({ pdfUrl = QuantumPdf }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) =>
      Math.min(Math.max(prevPageNumber + offset, 1), numPages)
    );
  };

  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-4 flex justify-between items-center text-gray-800">
          <div className="flex space-x-2">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm">
            Page {pageNumber} of {numPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={zoomOut}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={zoomIn}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <Document
            file={"../assest/Quantum.pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center bg-gray-50"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="transition-transform duration-200 ease-in-out"
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
