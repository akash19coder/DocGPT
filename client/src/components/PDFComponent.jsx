import { FileText } from "lucide-react";

export default function PDFFileComponent({ fileName, fileSize }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50">
        <FileText className="w-5 h-5 text-red-500" />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium text-gray-900 truncate"
          title={fileName}
        >
          {fileName}
        </p>
        {fileSize && <p className="text-xs text-gray-500">{fileSize}</p>}
      </div>
    </div>
  );
}
