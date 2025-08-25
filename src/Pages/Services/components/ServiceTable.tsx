import React from "react";

// Props interface for ServiceTable component
interface ServiceTableProps {
  headers: string[];
  data: any[][];
  className?: string;
}

// Generic ServiceTable component for displaying tabular data
// Reusable component that can be used across different service pages
// Compatible with Strapi CMS for future data integration
const ServiceTable: React.FC<ServiceTableProps> = ({ 
  headers, 
  data, 
  className = "" 
}) => {
  
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {/* Table header */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index}
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        cellIndex === 0 
                          ? 'text-gray-900 dark:text-gray-100' 
                          : cellIndex === headers.length - 2 || headers[cellIndex]?.toLowerCase().includes('rate')
                            ? 'text-khaki font-semibold'
                            : 'text-gray-900 dark:text-gray-100'
                      } ${cellIndex === 1 ? 'font-medium' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state when no data */}
        {data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No data available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTable;
