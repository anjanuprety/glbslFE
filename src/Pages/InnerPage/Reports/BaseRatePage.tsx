import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const BaseRatePage: React.FC = () => {
  // Sample base rate documents data - in real implementation, this would come from Strapi CMS
  const rateDocuments = [
    {
      id: 1,
      title: "Interest Rate Schedule January 2025",
      description: "Updated interest rates for all loan and deposit products",
      effectiveDate: "January 1, 2025",
      publishDate: "December 2024",
      fileSize: "0.8 MB",
      pdfUrl: "/reports/rates-jan-2025.pdf", // This would be the actual file URL from Strapi/Google Drive
      baseRate: "12.5%",
      category: "Current Rates"
    },
    {
      id: 2,
      title: "Base Rate Revision Notice December 2024", 
      description: "Quarterly base rate revision and announcement",
      effectiveDate: "December 15, 2024",
      publishDate: "December 2024",
      fileSize: "0.5 MB",
      pdfUrl: "/reports/base-rate-dec-2024.pdf",
      baseRate: "12.0%",
      category: "Rate Revision"
    },
    {
      id: 3,
      title: "Interest Rate Schedule October 2024",
      description: "Revised interest rates following NRB directives", 
      effectiveDate: "October 1, 2024",
      publishDate: "September 2024",
      fileSize: "0.9 MB",
      pdfUrl: "/reports/rates-oct-2024.pdf",
      baseRate: "11.8%",
      category: "Historical Rates"
    },
    {
      id: 4,
      title: "Special Rate Notification July 2024",
      description: "Special interest rates for agricultural loans",
      effectiveDate: "July 15, 2024", 
      publishDate: "July 2024",
      fileSize: "0.6 MB",
      pdfUrl: "/reports/special-rates-jul-2024.pdf",
      baseRate: "11.5%",
      category: "Special Rates"
    },
    {
      id: 5,
      title: "Interest Rate Schedule April 2024",
      description: "Quarterly interest rate update and changes",
      effectiveDate: "April 1, 2024",
      publishDate: "March 2024",
      fileSize: "0.8 MB", 
      pdfUrl: "/reports/rates-apr-2024.pdf",
      baseRate: "11.2%",
      category: "Historical Rates"
    },
    {
      id: 6,
      title: "Base Rate Policy Document 2024",
      description: "Annual base rate methodology and policy framework",
      effectiveDate: "January 1, 2024",
      publishDate: "December 2023",
      fileSize: "1.2 MB",
      pdfUrl: "/reports/base-rate-policy-2024.pdf",
      baseRate: "11.0%",
      category: "Policy Document"
    }
  ];

  const handleDownload = (document: typeof rateDocuments[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${document.title}`);
  };

  const handleView = (document: typeof rateDocuments[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${document.title} for viewing`);
  };

  const handleShare = async (document: typeof rateDocuments[0]) => {
    // Demo implementation for sharing specific document
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${document.title} - GLBSL`,
          text: `Check out our ${document.title}`,
          url: `${window.location.origin}/reports/base-rate/${document.id}`,
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
      case "Current Rates": return "bg-green-600";
      case "Rate Revision": return "bg-blue-600";
      case "Special Rates": return "bg-purple-600";
      case "Policy Document": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <section className="">
      <BreadCrumb title="BASE RATES & INTEREST RATES" home={"/"} />

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
                Interest Rates & Base Rate Information
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
                Access current and historical interest rates, base rate revisions, and policy documents
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
            {rateDocuments.map((document, index) => (
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
                        Effective: {document.effectiveDate}
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

export default BaseRatePage;
