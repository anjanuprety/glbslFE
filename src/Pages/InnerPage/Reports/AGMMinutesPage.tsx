import React, { useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { BsDownload, BsShare } from "react-icons/bs";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const AGMMinutesPage: React.FC = () => {
  const [pdfUrl] = useState("/documents/agm-minutes-sample.pdf");

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'AGM-Minutes-2023.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AGM Minutes 2023 - Gurans Laghubitta',
          text: 'AGM meeting minutes and resolutions',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="">
      <BreadCrumb title="AGM MINUTES" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4">
            <div
              className="overflow-hidden relative group "
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="w-full h-[600px] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full"
                  title="AGM Minutes PDF"
                  style={{ border: 'none' }}
                />
              </div>
              
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
                  title="Share Document"
                >
                  <BsShare size={16} />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
              </div>
            </div>

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

          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <div>
              <div
                className="bg-white dark:bg-normalBlack p-6 lg:p-[30px] 2xl:p-[40px]"
                data-aos="zoom-in-up"
                data-aos-duration="1000"
              >
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl leading-[26px] font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    AGM Minutes 2023
                  </h2>
                  <p className="text-khaki text-sm font-semibold uppercase">
                    Annual General Meeting
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Meeting Date: <span className="text-khaki">December 15, 2023</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Document Type: <span className="text-khaki">AGM Minutes</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      File Size: <span className="text-khaki">1.8 MB</span>
                    </p>
                  </div>
                  <div className="bg-whiteSmoke dark:bg-lightBlack h-12 lg:h-[56px] grid items-center justify-start px-4">
                    <p className="text-sm md:text-[15px] leading-[26px] font-Lora font-medium text-lightBlack dark:text-white">
                      Pages: <span className="text-khaki">12</span>
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Meeting Overview
                  </h3>
                  <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                    Official minutes from our Annual General Meeting held on December 15, 2023. This document contains all discussions, decisions, and resolutions passed during the meeting, ensuring transparency and accountability to our stakeholders.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-3">
                    Key Decisions
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Approval of annual financial statements
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Election of board members
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Strategic plan for 2024 approved
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm leading-6 text-gray dark:text-lightGray font-Lora">
                        Dividend distribution resolution
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full bg-khaki hover:bg-lightBlack text-white py-3 px-6 font-Garamond font-semibold text-[15px] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <BsDownload size={16} />
                  <span>Download Minutes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AGMMinutesPage;
