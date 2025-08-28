import React, { useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const AnnualReportPage: React.FC = () => {
  const [pdfUrl] = useState("/documents/annual-report-sample.pdf"); // This would be the actual PDF URL

  const handleDownload = () => {
    // Create a download link
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Annual-Report-2023.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Annual Report 2023 - Gurans Laghubitta',
          text: 'Check out our comprehensive annual report',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="">
      <BreadCrumb title="ANNUAL REPORT" home={"/"} />

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
              <div className="w-full h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full"
                  title="Annual Report PDF"
                  style={{ border: 'none' }}
                />
              </div>
              
              {/* Action buttons overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
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
                    Annual Report 2023
                  </h2>
                  <p className="text-khaki text-sm font-semibold uppercase">
                    Comprehensive Annual Report
                  </p>
                </div>

                {/* Report Details */}
                <div className="space-y-4 mb-6">
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Report Year: <span className="text-khaki">2023</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Published Date: <span className="text-khaki">January 30, 2024</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      File Size: <span className="text-khaki">8.7 MB</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Pages: <span className="text-khaki">68</span>
                    </p>
                  </div>
                </div>

                {/* Report Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Report Overview
                  </h3>
                  <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                    Our comprehensive annual report for 2023 showcases a year of remarkable growth and strategic achievements. This document provides detailed insights into our financial performance, operational excellence, and commitment to serving our community through microfinance services.
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    2023 Achievements
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Total assets grew by 35% to NPR 2.8 billion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Loan portfolio expanded to NPR 2.1 billion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Served over 15,000 active borrowers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Opened 3 new branch locations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        ROA maintained at 3.2%
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

export default AnnualReportPage;
