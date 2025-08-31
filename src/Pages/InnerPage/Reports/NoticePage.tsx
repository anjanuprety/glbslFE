import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";
import { useLanguage } from "../../../contexts/LanguageContext";

const NoticePage: React.FC = () => {
  const { t } = useLanguage();
  // Sample notices data - in real implementation, this would come from Strapi CMS
  const notices = [
    {
      id: 1,
      title: "Annual General Meeting Notice 2025",
      description: "Notice for the 25th Annual General Meeting scheduled for March 15, 2025",
      pdfUrl: "/notices/agm-notice-2025.pdf" // This would be the actual file URL from Strapi/Google Drive
    },
    {
      id: 2,
      title: "Dividend Declaration Notice Q4 2024", 
      description: "Notice regarding dividend declaration for the fourth quarter of 2024",
      pdfUrl: "/notices/dividend-notice-q4-2024.pdf"
    },
    {
      id: 3,
      title: "Branch Closure Notice - Pokhara Branch",
      description: "Temporary closure notice for Pokhara branch due to renovation works",
      pdfUrl: "/notices/branch-closure-pokhara.pdf"
    },
    {
      id: 4,
      title: "Interest Rate Change Notice",
      description: "Notice regarding changes in savings account interest rates effective February 1, 2025",
      pdfUrl: "/notices/interest-rate-change-2025.pdf"
    },
    {
      id: 5,
      title: "System Maintenance Notice",
      description: "Scheduled system maintenance and service interruption notice",
      pdfUrl: "/notices/system-maintenance-jan-2025.pdf"
    },
    {
      id: 6,
      title: "New Service Launch Notice",
      description: "Introduction of new digital banking services and mobile app features",
      pdfUrl: "/notices/new-services-launch-2025.pdf"
    }
  ];  const handleDownload = (notice: typeof notices[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${notice.title}`);
  };

  const handleView = (notice: typeof notices[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${notice.title} for viewing`);
  };

  const handleShare = async (notice: typeof notices[0]) => {
    // Demo implementation for sharing specific notice
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} - GLBSL`,
          text: `Check out our notice: ${notice.title}`,
          url: `${window.location.origin}/reports/notices/${notice.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        alert(`Demo: ${notice.title} link copied to clipboard!`);
      }
    } else {
      alert(`Demo: ${notice.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title={t('notices.title')} home={"/"} />

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
                {t('notices.important_notices')}
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
                {t('notices.description')}
              </p>
            </div>
          </div>

          {/* Notices Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
            {notices.map((notice, index) => (
              <div
                key={notice.id}
                className="overflow-x-hidden 3xl:w-[410px] group"
                data-aos="fade-up"
                data-aos-duration={800 + (index * 200)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <PDFPreview title={notice.title} description={notice.description} />
                  </div>

                  <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                    <button
                      onClick={() => handleView(notice)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="View PDF"
                    >
                      <BsEye className="w-3 h-3 mr-1" />
                      {t('reports.view')}
                    </button>
                    <button
                      onClick={() => handleDownload(notice)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Download PDF"
                    >
                      <BsDownload className="w-3 h-3 mr-1" />
                      {t('reports.download')}
                    </button>
                    <button
                      onClick={() => handleShare(notice)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Share Notice"
                    >
                      <BsShare className="w-3 h-3 mr-1" />
                      {t('reports.share')}
                    </button>
                  </div>
                </div>
                <div className="font-Garamond">
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                    <div className="py-6 px-[30px]">
                      <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                        {notice.title}
                      </h2>
                      <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                        {notice.description}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(notice)}
                          className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                        >
                          View
                        </button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                          onClick={() => handleDownload(notice)}
                          className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                        >
                          Download
                        </button>
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

export default NoticePage;
