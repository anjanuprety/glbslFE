import React from "react";
import { LoanProduct } from "../../../types";

// Props interface for LoanTable component
interface LoanTableProps {
  loanProducts: LoanProduct[];
  className?: string;
}

// LoanTable component for displaying loan products in a responsive table
// Compatible with Strapi CMS for future data integration
// Follows existing design patterns and responsive design principles
const LoanTable: React.FC<LoanTableProps> = ({ 
  loanProducts, 
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
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  S.N.
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Name of Loan Products
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Volume of Loan
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Rate
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Service Charge
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Term
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {loanProducts.map((product) => (
                <tr 
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.loanProductName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.loanVolume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-khaki font-semibold">
                    {product.interestRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.serviceCharge}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.loanTerm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state when no data */}
        {loanProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No loan products available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanTable;
