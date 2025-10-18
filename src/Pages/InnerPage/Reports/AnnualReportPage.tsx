import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const AnnualReportPage: React.FC = () => {
  // Sample annual reports data - in real implementation, this would come from Strapi CMS
  const annualReports = [
    {
      id: 1,
      title: "Annual Report 2024",
      description: "Comprehensive Annual Financial Report and Achievements",
      publishDate: "April 2025",
      fileSize: "8.2 MB",
      pdfUrl: "/reports/annual-2024.pdf", // This would be the actual file URL from Strapi/Google Drive
      highlights: "Record growth, expanded services, community impact"
    },
    {
      id: 2,
      title: "Annual Report 2023", 
      description: "Institutional Growth and Financial Performance Review",
      publishDate: "April 2024",
      fileSize: "7.8 MB",
      pdfUrl: "/reports/annual-2023.pdf",
      highlights: "Digital transformation, increased membership"
    },
    {
      id: 3,
      title: "Annual Report 2022",
      description: "Resilience and Adaptation in Challenging Times", 
      publishDate: "April 2023",
      fileSize: "7.5 MB",
      pdfUrl: "/reports/annual-2022.pdf",
      highlights: "COVID recovery, technology adoption"
    },
    {
      id: 4,
      title: "Annual Report 2021",
      description: "Innovation and Community Support During Pandemic",
      publishDate: "April 2022", 
      fileSize: "7.1 MB",
      pdfUrl: "/reports/annual-2021.pdf",
      highlights: "Digital services launch, community resilience"
    },
    {
      id: 5,
      title: "Annual Report 2020",
      description: "Stability and Growth in Microfinance Sector",
      publishDate: "April 2021",
      fileSize: "6.9 MB", 
      pdfUrl: "/reports/annual-2020.pdf",
      highlights: "Operational excellence, risk management"
    },
    {
      id: 6,
      title: "Annual Report 2019",
      description: "Foundation Years and Strategic Development",
      publishDate: "April 2020",
      fileSize: "6.5 MB",
      pdfUrl: "/reports/annual-2019.pdf",
      highlights: "Market expansion, product diversification"
    }
  ];

  const handleDownload = (report: typeof annualReports[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${report.title}`);
  };

  const handleView = (report: typeof annualReports[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${report.title} for viewing`);
  };

  const handleShare = async (report: typeof annualReports[0]) => {
    // Demo implementation for sharing specific report
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${report.title} - GLBSL`,
          text: `Check out our ${report.title}`,
          url: `${window.location.origin}/reports/annual/${report.id}`,
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
      <BreadCrumb title="ANNUAL REPORTS" home={"/"} />

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
                Annual Reports & Achievements
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
                Comprehensive annual reports showcasing our institutional growth and community impact
              </p>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
            {annualReports.map((report, index) => (
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
};

export default AnnualReportPage;
