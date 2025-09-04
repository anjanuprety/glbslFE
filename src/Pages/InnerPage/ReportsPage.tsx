import React from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoIosCall } from "react-icons/io";
import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import Swal from "sweetalert2";
import PDFPreview from "../../Components/Reports/PDFPreview";

const ReportsPage: React.FC = () => {
  // facilities slider breakpoints
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { origin: "center", perView: 1, spacing: 10 },
      },
      "(min-width: 500px)": {
        slides: { origin: "center", perView: 1.5, spacing: 10 },
      },
      "(min-width: 600px)": {
        slides: { origin: "center", perView: 1, spacing: 15 },
      },
      "(min-width: 768px)": {
        slides: { origin: "center", perView: 1, spacing: 18 },
      },
      "(min-width: 992px)": {
        slides: { origin: "center", perView: 2, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
  });

  return (
    <section className="">
      <BreadCrumb title="REPORTS & DOCUMENTS" home={"/"} />

      {/* All reports */}

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container ">
          {/* section heading */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white font-Garamond font-semibold capitalize">
                GLBSL Reports & Documents
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
                Access our comprehensive financial reports and institutional documents
              </p>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-16 2xl:pt-20">
            {/* Report - 1 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="Quarterly Report" description="Q4 2023 Financial Summary" />
                </div>

                <Link to={"/reports/quarterly-report"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Report{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      Financial Report
                    </h4>
                    <Link
                      to="/reports/quarterly-report"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        Quarterly Report
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Quarterly financial performance and business highlights for stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report - 2 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="Annual Report" description="Comprehensive 2023 Report" />
                </div>

                <Link to={"/reports/annual-report"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Report{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      Annual Report
                    </h4>
                    <Link
                      to="/reports/annual-report"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        Annual Report
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Comprehensive annual financial report and institutional achievements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report - 3 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="AGM Minutes" description="Board Meeting Minutes" />
                </div>

                <Link to={"/reports/agm-minutes"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Document{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      AGM Documents
                    </h4>
                    <Link
                      to="/reports/agm-minutes"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        AGM Minutes
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Annual General Meeting minutes and resolutions for transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report - 4 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="Base Rate Report" description="Interest Rate Analysis" />
                </div>

                <Link to={"/reports/base-rate"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Details{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      Rate Information
                    </h4>
                    <Link
                      to="/reports/base-rate"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        Base Rate
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Current base rates and interest rate information for all financial products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report - 5 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="Staff Training Report" description="Capacity Building Programs" />
                </div>

                <Link to={"/reports/staff-training"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Report{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      Training Reports
                    </h4>
                    <Link
                      to="/reports/staff-training"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        Staff Training
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Staff development programs and training completion reports for institutional capacity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report - 6 */}
            <div
              className="overflow-x-hidden 3xl:w-[410px] group"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <PDFPreview title="Governance Report" description="Corporate Governance Practices" />
                </div>

                <Link to={"/reports/governance-report"}>
                  <button className="flex items-center justify-center text-[15px] leading-[38px] bg-khaki  absolute bottom-0 -left-40 px-6 py-1 text-white  group-hover:left-0 transition-all duration-300">
                    View Report{" "}
                    <BsArrowRight className="w-4 h-4 ml-2  text-white" />{" "}
                  </button>
                </Link>
              </div>
              <div className="font-Garamond">
                <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242]  border-t-0">
                  <div className="py-6 px-[30px]">
                    <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                      Governance Documents
                    </h4>
                    <Link
                      to="/reports/governance-report"
                    >
                      <h2 className="text-2xl lg:text-[24px] xl:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                        Governance Report
                      </h2>
                    </Link>
                    <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                      Corporate governance practices and compliance reporting for transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-normalBlack py-20 lg:py-[120px] relative">
        <div className="Container pb-[100px] ">
          {/* Section heading */}
          <div
            className="flex items-center justify-between relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center justify-center  mx-auto">
              <div className="">
                <h1 className="text-center text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-white font-Garamond font-semibold capitalize">
                  Need Help With Reports?
                </h1>
                <div className="flex items-center justify-center text-center mx-auto mt-2 lg:mt-[6px]">
                  <div className="w-[100px] h-[1px] bg-[#3B3B3B] mr-5 "></div>
                  <img
                    src="/images/home-1/section-shape1.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <div className="w-[100px] h-[1px] bg-[#3B3B3B] ml-5"></div>
                </div>
                <p className="text-center text-sm lg:text-base leading-[26px] text-lightGray font-Lora font-normal mt-[10px]">
                  Contact our support team for assistance with report access or document requests
                </p>
              </div>
            </div>
          </div>
          {/* Contact info */}
          <div
            className="flex items-center text-center sm:text-left justify-center lg:justify-between pt-16 2xl:pt-20 flex-col lg:flex-row space-y-5 lg:space-y-0"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >
            <div className="">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-[50%] bg-khaki bg-opacity-[8%] flex items-center justify-center mr-4">
                  <IoIosCall className="w-5 h-5 lg:w-6 lg:h-6 text-khaki" />
                </div>
                <div className="">
                  <h4 className="text-base lg:text-lg leading-[26px] text-white font-Garamond font-medium">
                    Phone Number
                  </h4>
                  <p className="text-sm text-lightGray font-Lora font-normal">
                    +1-202-555-0174
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-[50%] bg-khaki bg-opacity-[8%] flex items-center justify-center mr-4">
                  <MdEmail className="w-5 h-5 lg:w-6 lg:h-6 text-khaki" />
                </div>
                <div className="">
                  <h4 className="text-base lg:text-lg leading-[26px] text-white font-Garamond font-medium">
                    Email Address
                  </h4>
                  <p className="text-sm text-lightGray font-Lora font-normal">
                    info@glbsl.com.np
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-[50%] bg-khaki bg-opacity-[8%] flex items-center justify-center mr-4">
                  <MdOutlineShareLocation className="w-5 h-5 lg:w-6 lg:h-6 text-khaki" />
                </div>
                <div className="">
                  <h4 className="text-base lg:text-lg leading-[26px] text-white font-Garamond font-medium">
                    Office Address
                  </h4>
                  <p className="text-sm text-lightGray font-Lora font-normal">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportsPage;
