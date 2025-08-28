import React from "react";

interface PDFPreviewProps {
  title?: string;
  description?: string;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  title = "PDF Document", 
  description = "Click to view" 
}) => {
  return (
    <div className="w-full h-[250px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
      <div className="text-center p-6">
        <svg className="w-16 h-16 text-khaki mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</p>
      </div>
    </div>
  );
};

export default PDFPreview;
