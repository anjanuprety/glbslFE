import React, { useState } from "react";

interface PDFPreviewProps {
  title?: string;
  description?: string;
  fileId?: string; // Google Drive file ID
  showThumbnail?: boolean; // Whether to show actual PDF thumbnail
}

// Helper function to generate Google Drive thumbnail URL
const getGoogleDriveThumbnailUrl = (fileId: string): string => {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h300`;
};

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  title = "PDF Document", 
  description = "Click to view",
  fileId,
  showThumbnail = true
}) => {
  const [thumbnailError, setThumbnailError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleThumbnailLoad = () => {
    setIsLoading(false);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
    setIsLoading(false);
  };

  // If we have a fileId and want to show thumbnail, try to load it
  if (fileId && showThumbnail && !thumbnailError) {
    return (
      <div className="w-full h-[250px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-khaki mb-2"></div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Loading preview...</p>
            </div>
          </div>
        )}
        <img
          src={getGoogleDriveThumbnailUrl(fileId)}
          alt={`${title} thumbnail`}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleThumbnailLoad}
          onError={handleThumbnailError}
        />
        {/* Overlay with document info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm font-medium truncate">{title}</p>
          <p className="text-white/80 text-xs truncate">{description}</p>
        </div>
      </div>
    );
  }

  // Fallback to generic PDF icon if no fileId or thumbnail failed to load
  return (
    <div className="w-full h-[250px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
      <div className="text-center p-6">
        <svg className="w-16 h-16 text-khaki mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</p>
        {thumbnailError && (
          <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-2">Preview not available</p>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
