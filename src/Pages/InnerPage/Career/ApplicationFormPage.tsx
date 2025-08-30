import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsEye, BsPrinter } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PDFPreview from "../../../Components/Reports/PDFPreview";

const ApplicationFormPage: React.FC = () => {
  // Sample application forms data - in real implementation, this would come from Strapi CMS
  const applicationForms = [
    {
      id: 1,
      title: "General Job Application Form",
      description: "Standard application form for all general positions. Fill this form for most job openings.",
      pdfUrl: "/career-forms/general-application-form.pdf",
      fileSize: "245 KB",
      lastUpdated: "January 2025"
    },
    {
      id: 2,
      title: "Banking Officer Application Form", 
      description: "Specialized form for Banking Officer positions with additional banking-related questions.",
      pdfUrl: "/career-forms/banking-officer-application.pdf",
      fileSize: "320 KB", 
      lastUpdated: "December 2024"
    },
    {
      id: 3,
      title: "Management Position Application Form",
      description: "Application form for senior and management level positions with leadership experience sections.",
      pdfUrl: "/career-forms/management-application-form.pdf",
      fileSize: "380 KB",
      lastUpdated: "January 2025"
    },
    {
      id: 4,
      title: "IT Position Application Form",
      description: "Technical application form for IT and technology-related positions.",
      pdfUrl: "/career-forms/it-position-application.pdf",
      fileSize: "295 KB",
      lastUpdated: "November 2024"
    }
  ];

  const handleDownload = (form: typeof applicationForms[0]) => {
    // Demo implementation - in real app, this would download from Strapi/Google Drive
    alert(`Demo: Downloading ${form.title}`);
  };

  const handleView = (form: typeof applicationForms[0]) => {
    // Demo implementation - in real app, this would open PDF in new tab
    alert(`Demo: Opening ${form.title} for viewing`);
  };

  const handlePrint = (form: typeof applicationForms[0]) => {
    // Demo implementation for printing
    alert(`Demo: Sending ${form.title} to printer`);
  };

  return (
    <section className="">
      <BreadCrumb title="APPLICATION FORMS" home={"/"} />

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
                Job Application Forms
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
                Download and fill out the appropriate application form for your desired position
              </p>
            </div>
          </div>

          {/* Application Forms Grid */}
          <div className="grid md:grid-cols-2 gap-8 pt-8">
            {applicationForms.map((form, index) => (
              <div
                key={form.id}
                className="overflow-x-hidden group"
                data-aos="fade-up"
                data-aos-duration={800 + (index * 200)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <PDFPreview title={form.title} description={form.description} />
                  </div>

                  <div className="flex space-x-2 absolute bottom-2 -left-52 group-hover:left-2 transition-all duration-300">
                    <button
                      onClick={() => handleView(form)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-khaki px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="View PDF"
                    >
                      <BsEye className="w-3 h-3 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(form)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-green-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Download PDF"
                    >
                      <BsDownload className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => handlePrint(form)}
                      className="flex items-center justify-center text-[13px] leading-[32px] bg-blue-600 px-4 py-1 text-white hover:bg-opacity-90 transition-all duration-300"
                      title="Print Form"
                    >
                      <BsPrinter className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="font-Garamond">
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                    <div className="py-6 px-[30px]">
                      <h2 className="text-lg lg:text-[20px] xl:text-[22px] leading-[24px] font-semibold text-lightBlack dark:text-white py-3">
                        {form.title}
                      </h2>
                      <p className="text-sm font-normal text-gray dark:text-lightGray font-Lora mb-3">
                        {form.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          File Size: {form.fileSize}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Updated: {form.lastUpdated}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(form)}
                          className="text-xs text-khaki hover:text-opacity-80 transition-colors duration-300"
                        >
                          Preview
                        </button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                          onClick={() => handleDownload(form)}
                          className="text-xs text-green-600 hover:text-opacity-80 transition-colors duration-300"
                        >
                          Download
                        </button>
                        <span className="text-xs text-gray-300">|</span>
                        <button
                          onClick={() => handlePrint(form)}
                          className="text-xs text-blue-600 hover:text-opacity-80 transition-colors duration-300"
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions Section */}
          <div className="mt-16 bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
              Application Instructions
            </h3>
            <div className="text-gray dark:text-lightGray font-Lora space-y-3">
              <p>1. <strong>Choose the Right Form:</strong> Select the application form that matches the position you're applying for.</p>
              <p>2. <strong>Download & Fill:</strong> Download the PDF form and fill it out completely using a PDF reader or print and fill by hand.</p>
              <p>3. <strong>Required Documents:</strong> Attach all required documents as mentioned in the job posting.</p>
              <p>4. <strong>Submission:</strong> Submit your completed application as instructed in the job notice.</p>
              <p>5. <strong>Contact:</strong> For questions about the application process, contact our HR department.</p>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex justify-center mt-16 space-x-8">
            <Link
              to="/career/notices"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              <HiArrowLongLeft className="w-5 h-5 mr-2" />
              Back to Career Notices
            </Link>
            <Link
              to="/career/apply"
              className="flex items-center text-khaki hover:text-opacity-80 transition-colors duration-300"
            >
              Apply Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationFormPage;
