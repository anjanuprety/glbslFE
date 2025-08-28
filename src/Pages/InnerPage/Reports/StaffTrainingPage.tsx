import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const StaffTrainingPage: React.FC = () => {
  // Sample staff training documents data - in real implementation, this would come from Strapi CMS
  const trainingDocuments = [
    {
      id: 1,
      title: "Annual Training Report 2024",
      description: "Comprehensive staff development and training completion report",
      trainingPeriod: "January - December 2024",
      publishDate: "January 2025",
      fileSize: "3.2 MB",
      pdfUrl: "/reports/training-annual-2024.pdf", // This would be the actual file URL from Strapi/Google Drive
      participants: 45,
      completionRate: "94%",
      category: "Annual Report"
    },
    {
      id: 2,
      title: "Digital Banking Training Program Q4 2024", 
      description: "Digital banking systems and technology training completion",
      trainingPeriod: "October - December 2024",
      publishDate: "December 2024",
      fileSize: "1.8 MB",
      pdfUrl: "/reports/digital-banking-q4-2024.pdf",
      participants: 28,
      completionRate: "100%",
      category: "Technical Training"
    },
    {
      id: 3,
      title: "Risk Management Training Workshop",
      description: "Credit risk assessment and management training program", 
      trainingPeriod: "September 2024",
      publishDate: "October 2024",
      fileSize: "2.1 MB",
      pdfUrl: "/reports/risk-management-sep-2024.pdf",
      participants: 35,
      completionRate: "89%",
      category: "Risk Management"
    },
    {
      id: 4,
      title: "Customer Service Excellence Training",
      description: "Customer service and communication skills development program",
      trainingPeriod: "August 2024", 
      publishDate: "August 2024",
      fileSize: "1.5 MB",
      pdfUrl: "/reports/customer-service-aug-2024.pdf",
      participants: 42,
      completionRate: "96%",
      category: "Soft Skills"
    },
    {
      id: 5,
      title: "Compliance and Regulatory Training",
      description: "Regulatory compliance and legal framework training",
      trainingPeriod: "June 2024",
      publishDate: "July 2024",
      fileSize: "2.4 MB", 
      pdfUrl: "/reports/compliance-jun-2024.pdf",
      participants: 38,
      completionRate: "91%",
      category: "Compliance"
    },
    {
      id: 6,
      title: "Leadership Development Program 2024",
      description: "Management and leadership skills development for senior staff",
      trainingPeriod: "March - May 2024",
      publishDate: "June 2024",
      fileSize: "2.8 MB",
      pdfUrl: "/reports/leadership-dev-2024.pdf",
      participants: 15,
      completionRate: "87%",
      category: "Leadership"
    }
  ];

  const handleDownload = (document: typeof trainingDocuments[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${document.title}`);
  };

  const handleView = (document: typeof trainingDocuments[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${document.title} for viewing`);
  };

  const handleShare = async (document: typeof trainingDocuments[0]) => {
    // Demo implementation for sharing specific document
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${document.title} - GLBSL`,
          text: `Check out our ${document.title}`,
          url: `${window.location.origin}/reports/staff-training/${document.id}`,
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
      case "Annual Report": return "bg-blue-600";
      case "Technical Training": return "bg-green-600";
      case "Risk Management": return "bg-red-600";
      case "Soft Skills": return "bg-purple-600";
      case "Compliance": return "bg-orange-600";
      case "Leadership": return "bg-indigo-600";
      default: return "bg-gray-600";
    }
  };

  const getCompletionRateColor = (rate: string) => {
    const numericRate = parseInt(rate);
    if (numericRate >= 95) return "text-green-600 dark:text-green-300";
    if (numericRate >= 90) return "text-blue-600 dark:text-blue-300";
    return "text-orange-600 dark:text-orange-300";
  };

  return (
    <section className="">
      <BreadCrumb title="STAFF TRAINING REPORTS" home={"/"} />

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
                Staff Training & Development Reports
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
                Access staff development programs, training completion reports, and capacity building initiatives
              </p>
            </div>
          </div>

          {/* Training Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16 mt-12">
            <div className="bg-white dark:bg-normalBlack p-6 rounded-lg text-center" data-aos="zoom-in-up" data-aos-duration="800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">203</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Training Hours</p>
            </div>
            <div className="bg-white dark:bg-normalBlack p-6 rounded-lg text-center" data-aos="zoom-in-up" data-aos-duration="1000">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">45</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Staff Participants</p>
            </div>
            <div className="bg-white dark:bg-normalBlack p-6 rounded-lg text-center" data-aos="zoom-in-up" data-aos-duration="1200">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">92%</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Average Completion Rate</p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
            {trainingDocuments.map((document, index) => (
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

                  {/* Category Badge */}
                  <div className={`absolute top-3 right-3 ${getCategoryColor(document.category)} text-white px-2 py-1 rounded-md text-xs font-medium`}>
                    {document.category}
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
                    <button
                      onClick={() => handleShare(document)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Share Document"
                    >
                      <BsShare className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="font-Garamond">
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                    <div className="py-6 px-[30px]">
                      <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                        {document.trainingPeriod}
                      </h4>
                      <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                        {document.title}
                      </h2>
                      <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                        {document.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md text-center">
                          <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">Participants</p>
                          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">{document.participants}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Completion</p>
                          <p className={`text-sm font-semibold ${getCompletionRateColor(document.completionRate)}`}>
                            {document.completionRate}
                          </p>
                        </div>
                      </div>
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

export default StaffTrainingPage;
