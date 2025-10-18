import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const GovernanceReportPage: React.FC = () => {
  // Sample governance documents data - in real implementation, this would come from Strapi CMS
  const governanceDocuments = [
    {
      id: 1,
      title: "Corporate Governance Report 2024",
      description: "Comprehensive governance practices and compliance reporting",
      reportingPeriod: "Financial Year 2024",
      publishDate: "March 2025",
      fileSize: "4.1 MB",
      pdfUrl: "/reports/governance-2024.pdf", // This would be the actual file URL from Strapi/Google Drive
      boardMeetings: 12,
      complianceScore: "98%",
      category: "Annual Governance"
    },
    {
      id: 2,
      title: "Board Meeting Minutes Q4 2024", 
      description: "Fourth quarter board meeting minutes and decisions",
      reportingPeriod: "October - December 2024",
      publishDate: "January 2025",
      fileSize: "1.9 MB",
      pdfUrl: "/reports/board-minutes-q4-2024.pdf",
      boardMeetings: 3,
      complianceScore: "100%",
      category: "Board Minutes"
    },
    {
      id: 3,
      title: "Risk Management Framework 2024",
      description: "Updated risk management policies and implementation guidelines", 
      reportingPeriod: "Updated December 2024",
      publishDate: "December 2024",
      fileSize: "3.5 MB",
      pdfUrl: "/reports/risk-framework-2024.pdf",
      boardMeetings: 2,
      complianceScore: "95%",
      category: "Policy Document"
    },
    {
      id: 4,
      title: "Audit Committee Report 2024",
      description: "Independent audit committee findings and recommendations",
      reportingPeriod: "Financial Year 2024", 
      publishDate: "February 2025",
      fileSize: "2.7 MB",
      pdfUrl: "/reports/audit-committee-2024.pdf",
      boardMeetings: 6,
      complianceScore: "97%",
      category: "Audit Report"
    },
    {
      id: 5,
      title: "Code of Conduct & Ethics 2024",
      description: "Updated code of conduct and ethical guidelines for staff",
      reportingPeriod: "Revised August 2024",
      publishDate: "August 2024",
      fileSize: "1.8 MB", 
      pdfUrl: "/reports/code-of-conduct-2024.pdf",
      boardMeetings: 1,
      complianceScore: "100%",
      category: "Policy Document"
    },
    {
      id: 6,
      title: "Regulatory Compliance Report Q3 2024",
      description: "Quarterly regulatory compliance status and updates",
      reportingPeriod: "July - September 2024",
      publishDate: "October 2024",
      fileSize: "2.3 MB",
      pdfUrl: "/reports/compliance-q3-2024.pdf",
      boardMeetings: 3,
      complianceScore: "96%",
      category: "Compliance Report"
    }
  ];

  const handleDownload = (document: typeof governanceDocuments[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${document.title}`);
  };

  const handleView = (document: typeof governanceDocuments[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${document.title} for viewing`);
  };

  const handleShare = async (document: typeof governanceDocuments[0]) => {
    // Demo implementation for sharing specific document
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${document.title} - GLBSL`,
          text: `Check out our ${document.title}`,
          url: `${window.location.origin}/reports/governance/${document.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`Demo: ${document.title} link copied to clipboard!`);
      }
    } else {
      alert(`Demo: ${document.title} link copied to clipboard!`);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Annual Governance": return "bg-blue-600";
      case "Board Minutes": return "bg-green-600";
      case "Policy Document": return "bg-purple-600";
      case "Audit Report": return "bg-red-600";
      case "Compliance Report": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const getComplianceColor = (score: string) => {
    const numericScore = parseInt(score);
    if (numericScore >= 98) return "text-green-600 dark:text-green-300";
    if (numericScore >= 95) return "text-blue-600 dark:text-blue-300";
    return "text-orange-600 dark:text-orange-300";
  };

  return (
    <section className="">
      <BreadCrumb title="GOVERNANCE REPORTS" home={"/"} />

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
                Corporate Governance & Compliance Reports
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
                Access governance practices, compliance reports, and transparency documentation
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
            {governanceDocuments.map((document, index) => (
              <div
                key={document.id}
                className="overflow-x-hidden 3xl:w-[410px] group"
                data-aos="fade-up"
                data-aos-duration={800 + (index * 200)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <PDFPreview title={document.title} description={document.description} />
                  </div>

                  <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                    <button
                      onClick={() => handleView(document)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="View PDF"
                    >
                      <BsEye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(document)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Download PDF"
                    >
                      <BsDownload className="w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="font-Garamond">
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                    <div className="py-6 px-[30px]">
                      <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                        {document.reportingPeriod}
                      </h4>
                      <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                        {document.title}
                      </h2>
                      <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                        {document.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          File Size: {document.fileSize}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(document)}
                            className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                          >
                            Quick View
                          </button>
                          <span className="text-xs text-gray-300">|</span>
                          <button
                            onClick={() => handleDownload(document)}
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
};

export default GovernanceReportPage;
