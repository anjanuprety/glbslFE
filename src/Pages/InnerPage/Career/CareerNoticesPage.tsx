import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const CareerNoticesPage: React.FC = () => {
  // Sample career notices data - in real implementation, this would come from Strapi CMS
  const careerNotices = [
    {
      id: 1,
      title: "Banking Officer Position - Kathmandu Branch",
      description: "We are seeking qualified Banking Officers for our main Kathmandu branch. Fresh graduates are encouraged to apply.",
      pdfUrl: "/career-notices/banking-officer-ktm-2025.pdf" // This would be the actual file URL from Strapi/Google Drive
    },
    {
      id: 2,
      title: "Credit Analyst - Multiple Positions", 
      description: "Multiple openings for Credit Analysts across our branch network. Experience in credit analysis preferred.",
      pdfUrl: "/career-notices/credit-analyst-multiple-2025.pdf"
    },
    {
      id: 3,
      title: "IT Support Specialist - Head Office",
      description: "Technical position for IT Support Specialist at our head office. Knowledge of banking systems preferred.",
      pdfUrl: "/career-notices/it-support-head-office.pdf"
    },
    {
      id: 4,
      title: "Customer Service Representative",
      description: "Customer-facing roles available at various branches. Excellent communication skills required.",
      pdfUrl: "/career-notices/customer-service-rep-2025.pdf"
    },
    {
      id: 5,
      title: "Branch Manager - Pokhara Branch",
      description: "Senior management position available at our Pokhara branch. Minimum 5 years banking experience required.",
      pdfUrl: "/career-notices/branch-manager-pokhara.pdf"
    },
    {
      id: 6,
      title: "Loan Officer - Rural Branches",
      description: "Loan Officers needed for our rural branch expansion. Experience in rural banking preferred.",
      pdfUrl: "/career-notices/loan-officer-rural-2025.pdf"
    }
  ];

  const handleDownload = (notice: typeof careerNotices[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${notice.title}`);
  };

  const handleView = (notice: typeof careerNotices[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${notice.title} for viewing`);
  };

  const handleShare = async (notice: typeof careerNotices[0]) => {
    // Demo implementation for sharing specific career notice
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${notice.title} - GLBSL Career`,
          text: `Check out this job opportunity: ${notice.title}`,
          url: `${window.location.origin}/career/notices/${notice.id}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback for unsupported share
        navigator.clipboard.writeText(`${window.location.origin}/career/notices/${notice.id}`);
        alert(`Demo: ${notice.title} link copied to clipboard!`);
      }
    } else {
      alert(`Demo: ${notice.title} link copied to clipboard!`);
    }
  };

  return (
    <section className="">
      <BreadCrumb title="CAREER OPPORTUNITIES" home={"/"} />

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
                Career Opportunities & Job Vacancies
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
                Join our team and build your career with us. Explore current job openings and opportunities
              </p>
            </div>
          </div>

          {/* Career Notices Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8">
            {careerNotices.map((notice, index) => (
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
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(notice)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Download PDF"
                    >
                      <BsDownload className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handleShare(notice)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Share Job Posting"
                    >
                      <BsShare className="w-3 h-3" />
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
                          View Details
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

          {/* Back to Career Navigation */}
          <div className="flex justify-center mt-16">
            <Link
              to="/career/apply"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300 mr-8"
            >
              Apply for Jobs
            </Link>
            <Link
              to="/career/application-form"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              Download Application Form
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerNoticesPage;
