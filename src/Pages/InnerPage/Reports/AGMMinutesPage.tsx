import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const AGMMinutesPage: React.FC = () => {
  // Sample AGM documents data - in real implementation, this would come from Strapi CMS
  const agmDocuments = [
    {
      id: 1,
      title: "AGM Minutes 2024",
      description: "Annual General Meeting Minutes and Resolutions",
      meetingDate: "March 15, 2025",
      publishDate: "April 2025",
      fileSize: "1.8 MB",
      pdfUrl: "/reports/agm-2024.pdf", // This would be the actual file URL from Strapi/Google Drive
      attendees: "89 members",
      resolutions: 8
    },
    {
      id: 2,
      title: "AGM Minutes 2023", 
      description: "Annual General Meeting Minutes and Board Elections",
      meetingDate: "March 20, 2024",
      publishDate: "April 2024",
      fileSize: "1.6 MB",
      pdfUrl: "/reports/agm-2023.pdf",
      attendees: "82 members",
      resolutions: 7
    },
    {
      id: 3,
      title: "AGM Minutes 2022",
      description: "Annual General Meeting Minutes and Policy Updates", 
      meetingDate: "March 18, 2023",
      publishDate: "April 2023",
      fileSize: "1.7 MB",
      pdfUrl: "/reports/agm-2022.pdf",
      attendees: "76 members",
      resolutions: 6
    },
    {
      id: 4,
      title: "AGM Minutes 2021",
      description: "Annual General Meeting Minutes and Strategic Planning",
      meetingDate: "March 22, 2022", 
      publishDate: "April 2022",
      fileSize: "1.5 MB",
      pdfUrl: "/reports/agm-2021.pdf",
      attendees: "71 members",
      resolutions: 9
    },
    {
      id: 5,
      title: "Special AGM 2021",
      description: "Special General Meeting for Emergency Resolutions",
      meetingDate: "August 15, 2021",
      publishDate: "August 2021",
      fileSize: "0.9 MB", 
      pdfUrl: "/reports/special-agm-2021.pdf",
      attendees: "68 members",
      resolutions: 3
    },
    {
      id: 6,
      title: "AGM Minutes 2020",
      description: "Annual General Meeting Minutes and Governance Review",
      meetingDate: "March 25, 2021",
      publishDate: "April 2021",
      fileSize: "1.4 MB",
      pdfUrl: "/reports/agm-2020.pdf",
      attendees: "65 members",
      resolutions: 5
    }
  ];

  const handleDownload = (document: typeof agmDocuments[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${document.title}`);
  };

  const handleView = (document: typeof agmDocuments[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${document.title} for viewing`);
  };

  const handleShare = async (document: typeof agmDocuments[0]) => {
    // Demo implementation for sharing specific document
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${document.title} - GLBSL`,
          text: `Check out our ${document.title}`,
          url: `${window.location.origin}/reports/agm-minutes/${document.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`Demo: ${document.title} link copied to clipboard!`);
      }
    } else {
      alert(`Demo: ${document.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title="AGM MINUTES & DOCUMENTS" home={"/"} />

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
                AGM Minutes & Governance Documents
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
                Access Annual General Meeting minutes, resolutions, and governance documents for transparency
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
            {agmDocuments.map((document, index) => (
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
                        {document.meetingDate}
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

export default AGMMinutesPage;
