import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

const ApplyForJobPage: React.FC = () => {
  return (
    <section className="">
      <BreadCrumb title="APPLY FOR JOB" home={"/"} />

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
                Apply for Job Positions
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
                Start your career journey with us. This section will contain job application functionality.
              </p>
            </div>
          </div>

          {/* Placeholder content - to be implemented later */}
          <div className="flex justify-center mt-16">
            <div className="text-center max-w-2xl">
              <div className="bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-12 shadow-lg">
                <h3 className="text-xl font-semibold text-lightBlack dark:text-white mb-4 font-Garamond">
                  Job Application System
                </h3>
                <p className="text-gray dark:text-lightGray font-Lora mb-6">
                  This page will be implemented with a comprehensive job application system including:
                </p>
                <ul className="text-left text-gray dark:text-lightGray font-Lora space-y-2 mb-8">
                  <li>• Online job application forms</li>
                  <li>• Document upload functionality</li>
                  <li>• Application status tracking</li>
                  <li>• Position-specific requirements</li>
                  <li>• Integration with HR system</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-Lora">
                  Coming soon...
                </p>
              </div>
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

export default ApplyForJobPage;
