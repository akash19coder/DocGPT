import { FileText, Search, Sparkles } from "lucide-react";

const DocGPTIntro = () => {
  return (
    <div className="w-full max-w-3xl mt-16 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm border border-blue-100">
      <p className="text-center text-gray-700 mb-4">
        Your intelligent document assistant powered by AI
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
          <Search className="h-5 w-5 text-blue-600 mb-2" />
          <h3 className="font-medium text-gray-800">Search Documents</h3>
          <p className="text-sm text-gray-600 text-center">
            Find information across all your documents instantly
          </p>
        </div>

        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
          <Sparkles className="h-5 w-5 text-blue-600 mb-2" />
          <h3 className="font-medium text-gray-800">AI-Powered Insights</h3>
          <p className="text-sm text-gray-600 text-center">
            Get intelligent summaries and analysis of your content
          </p>
        </div>

        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
          <FileText className="h-5 w-5 text-blue-600 mb-2" />
          <h3 className="font-medium text-gray-800">Document Management</h3>
          <p className="text-sm text-gray-600 text-center">
            Organize and manage your documents efficiently
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Upload your PDF below to start interacting
      </div>
    </div>
  );
};

export default DocGPTIntro;
