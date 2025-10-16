import React from 'react';
import { BsX } from 'react-icons/bs';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  fileSource?: 'Google_Drive' | 'Upload';
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  isOpen, 
  onClose, 
  fileUrl, 
  fileName,
  fileSource = 'Upload'
}) => {
  if (!isOpen) return null;

  // For Google Drive files, use the preview URL
  const viewUrl = fileSource === 'Google_Drive' 
    ? `https://drive.google.com/file/d/${fileUrl}/preview`
    : fileUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {fileName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {fileSource === 'Google_Drive' ? 'Google Drive' : 'Direct Upload'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close viewer"
            >
              <BsX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            {fileSource === 'Google_Drive' ? (
              // Google Drive iframe
              <iframe
                src={viewUrl}
                className="w-full h-full border-0"
                title={fileName}
                allow="autoplay"
              />
            ) : (
              // Direct upload - use object tag for better PDF support
              <object
                data={viewUrl}
                type="application/pdf"
                className="w-full h-full"
                aria-label={fileName}
              >
                <div className="flex items-center justify-center h-full p-8 text-center">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Unable to display PDF in browser.
                    </p>
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-khaki text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </object>
            )}
          </div>

          {/* Footer with actions */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <a
                href={fileSource === 'Google_Drive' ? `https://drive.google.com/file/d/${fileUrl}/view` : viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Open in New Tab
              </a>
              <a
                href={viewUrl}
                download={fileName}
                className="px-4 py-2 bg-khaki text-white rounded hover:bg-opacity-90 transition-colors text-sm"
              >
                Download
              </a>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
