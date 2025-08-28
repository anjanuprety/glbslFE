import React, { useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const QuarterlyReportPage: React.FC = () => {
  const [pdfUrl] = useState(""); // In real implementation, this would be the actual PDF URL

  const handleDownload = () => {
    // Demo implementation - in real app, this would download the actual PDF
    alert('Demo: In a real implementation, this would download the Quarterly Report PDF file.');
  };

  const handleView = () => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert('Demo: In a real implementation, this would open the PDF in a new tab for viewing.');
  };

  const handleShare = async () => {
    // Demo implementation
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quarterly Report - Gurans Laghubitta',
          text: 'Check out our latest quarterly report',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert('Demo: Report link copied to clipboard!');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Demo: Report link copied to clipboard!');
      }).catch(() => {
        alert('Demo: In a real implementation, this would share the report link.');
      });
    }
  };

  return (
    <section className="">
      <BreadCrumb title="QUARTERLY REPORT" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4">
            {/* PDF Viewer */}
            <div
              className="overflow-hidden relative group "
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              {/* PDF Preview */}
              <div className="w-full h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                {/* PDF Preview Placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-Garamond font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Quarterly Report Q1 2024
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      PDF Document Preview
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                      In a real implementation, the actual PDF would be displayed here using PDF.js or similar technology.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleView}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all duration-300 flex items-center space-x-2"
                      >
                        <BsEye size={16} />
                        <span>View PDF</span>
                      </button>
                      <button
                        onClick={handleDownload}
                        className="bg-khaki hover:bg-lightBlack text-white px-6 py-3 rounded-md transition-all duration-300 flex items-center space-x-2"
                      >
                        <BsDownload size={16} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={handleView}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-all duration-300 flex items-center space-x-1"
                  title="View PDF"
                >
                  <BsEye size={16} />
                  <span className="hidden sm:inline text-sm">View</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-khaki hover:bg-lightBlack text-white p-2 rounded-md transition-all duration-300 flex items-center space-x-1"
                  title="Download PDF"
                >
                  <BsDownload size={16} />
                  <span className="hidden sm:inline text-sm">Download</span>
                </button>
                <button
                  onClick={handleShare}
                  className="bg-lightBlack hover:bg-khaki text-white p-2 rounded-md transition-all duration-300 flex items-center space-x-1"
                  title="Share Report"
                >
                  <BsShare size={16} />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Back to reports */}
            <div className="mt-6">
              <Link 
                to="/reports"
                className="inline-flex items-center text-khaki hover:text-lightBlack dark:hover:text-white transition-all duration-300"
              >
                <HiArrowLongLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-Garamond font-semibold">Back to Reports</span>
              </Link>
            </div>
          </div>

          {/* Report Information Sidebar */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div>
              <div
                className="bg-white dark:bg-normalBlack p-6 lg:p-[30px] 2xl:p-[40px]"
                data-aos="zoom-in-up"
                data-aos-duration="1000"
              >
                {/* Report Title */}
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl leading-[26px] font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Quarterly Report
                  </h2>
                  <p className="text-khaki text-sm font-semibold uppercase">
                    Financial Report - Q1 2024
                  </p>
                </div>

                {/* Report Details */}
                <div className="space-y-4 mb-6">
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Report Period: <span className="text-khaki">Q1 2024</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Published Date: <span className="text-khaki">April 15, 2024</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      File Size: <span className="text-khaki">2.3 MB</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Pages: <span className="text-khaki">24</span>
                    </p>
                  </div>
                </div>

                {/* Report Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Report Summary
                  </h3>
                  <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                    This quarterly report provides a comprehensive overview of our financial performance, operational highlights, and strategic initiatives for the first quarter of 2024. The report includes detailed financial statements, lending portfolio analysis, and key performance indicators.
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        15% growth in loan portfolio
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Improved NPL ratio to 2.5%
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Customer base expanded by 12%
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Digital banking initiatives launched
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="w-full bg-khaki hover:bg-lightBlack text-white py-3 px-6 font-Garamond font-semibold text-[15px] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <BsDownload size={16} />
                  <span>Download Full Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuarterlyReportPage;
