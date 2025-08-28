import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare, BsArrowRight } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const QuarterlyReportPage: React.FC = () => {
  // Sample quarterly reports data - in real implementation, this would come from Strapi CMS
  const quarterlyReports = [
    {
      id: 1,
      title: "Q4 2024 Quarterly Report",
      description: "Fourth Quarter Financial Performance Report",
      publishDate: "January 2025",
      fileSize: "2.3 MB",
      pdfUrl: "/reports/q4-2024.pdf" // This would be the actual file URL from Strapi/Google Drive
    },
    {
      id: 2,
      title: "Q3 2024 Quarterly Report", 
      description: "Third Quarter Financial Performance Report",
      publishDate: "October 2024",
      fileSize: "2.1 MB",
      pdfUrl: "/reports/q3-2024.pdf"
    },
    {
      id: 3,
      title: "Q2 2024 Quarterly Report",
      description: "Second Quarter Financial Performance Report", 
      publishDate: "July 2024",
      fileSize: "2.5 MB",
      pdfUrl: "/reports/q2-2024.pdf"
    },
    {
      id: 4,
      title: "Q1 2024 Quarterly Report",
      description: "First Quarter Financial Performance Report",
      publishDate: "April 2024", 
      fileSize: "2.2 MB",
      pdfUrl: "/reports/q1-2024.pdf"
    },
    {
      id: 5,
      title: "Q4 2023 Quarterly Report",
      description: "Fourth Quarter Financial Performance Report",
      publishDate: "January 2024",
      fileSize: "2.4 MB", 
      pdfUrl: "/reports/q4-2023.pdf"
    },
    {
      id: 6,
      title: "Q3 2023 Quarterly Report",
      description: "Third Quarter Financial Performance Report",
      publishDate: "October 2023",
      fileSize: "2.0 MB",
      pdfUrl: "/reports/q3-2023.pdf"
    }
  ];

  const handleDownload = (report: typeof quarterlyReports[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${report.title}`);
  };

  const handleView = (report: typeof quarterlyReports[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${report.title} for viewing`);
  };

  const handleShare = async (report: typeof quarterlyReports[0]) => {
    // Demo implementation for sharing specific report
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${report.title} - GLBSL`,
          text: `Check out our ${report.title}`,
          url: `${window.location.origin}/reports/quarterly/${report.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`Demo: ${report.title} link copied to clipboard!`);
      }
    } else {
      alert(`Demo: ${report.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title="QUARTERLY REPORTS" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* Section heading */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
                Quarterly Financial Reports
              </h1>
              <div className="flex items-center justify-center text-center mx-auto mt-2 lg:mt-[6px]">
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] mr-5 "></div>
                <img
                  src="/images/home-1/section-shape1.png"
                  className="w-[30px] h-[30px]"
                  alt=""
                />
                <div className="w-[100px] h-[1px] bg-[#ccc] dark:bg-[#3b3b3b] ml-5"></div>
              </div>
              <p className="text-center text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-Lora font-normal mt-[10px]">
                Access our quarterly financial performance reports and business highlights
              </p>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
            {quarterlyReports.map((report, index) => (
              <div
                key={report.id}
                className="overflow-x-hidden 3xl:w-[410px] group"
                data-aos="fade-up"
                data-aos-duration={800 + (index * 200)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <PDFPreview title={report.title} description={report.description} />
                  </div>

                  <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                    <button
                      onClick={() => handleView(report)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="View PDF"
                    >
                      <BsEye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(report)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Download PDF"
                    >
                      <BsDownload className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(report)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Share Report"
                    >
                      <BsShare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="font-Garamond">
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                    <div className="py-6 px-[30px]">
                      <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                        {report.publishDate}
                      </h4>
                      <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                        {report.title}
                      </h2>
                      <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          File Size: {report.fileSize}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(report)}
                            className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                          >
                            Quick View
                          </button>
                          <span className="text-xs text-gray-300">|</span>
                          <button
                            onClick={() => handleDownload(report)}
                            className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Reports Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/reports"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              Back to All Reports
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
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
