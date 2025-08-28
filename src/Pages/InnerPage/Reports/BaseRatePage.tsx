import React from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const BaseRatePage: React.FC = () => {
  return (
    <section className="">
      <BreadCrumb title="BASE RATE" home={"/"} />

      <div className="bg-whiteSmoke dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div
              className="text-center mb-12"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-4 font-Garamond font-semibold uppercase">
                Base Rate & Interest Rates
              </h1>
              <p className="text-gray dark:text-lightGray font-Lora">
                Current interest rates and base rate information for all our financial products
              </p>
            </div>

            {/* Base Rate Section */}
            <div
              className="bg-white dark:bg-normalBlack p-6 lg:p-8 rounded-lg mb-8"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h2 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-6">
                Current Base Rate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-khaki/10 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-2">
                    Base Rate
                  </h3>
                  <p className="text-3xl font-bold text-khaki">8.50%</p>
                  <p className="text-sm text-gray dark:text-lightGray mt-2">
                    Effective from: March 1, 2024
                  </p>
                </div>
                <div className="bg-gray/10 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white mb-2">
                    Previous Rate
                  </h3>
                  <p className="text-3xl font-bold text-gray dark:text-lightGray">8.25%</p>
                  <p className="text-sm text-gray dark:text-lightGray mt-2">
                    Valid until: February 29, 2024
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Interest Rates */}
            <div
              className="bg-white dark:bg-normalBlack p-6 lg:p-8 rounded-lg mb-8"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h2 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-6">
                Loan Interest Rates
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-khaki/10">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Loan Type
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Interest Rate
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Processing Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Micro Credit (Group)
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        15.00% - 18.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        1.50%
                      </td>
                    </tr>
                    <tr className="bg-gray/5">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Small Business Loan
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        12.00% - 16.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        2.00%
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Agriculture Loan
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        10.00% - 14.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        1.00%
                      </td>
                    </tr>
                    <tr className="bg-gray/5">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Individual Loan
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        14.00% - 20.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        2.50%
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Emergency Loan
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        18.00% - 22.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        3.00%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deposit Interest Rates */}
            <div
              className="bg-white dark:bg-normalBlack p-6 lg:p-8 rounded-lg mb-8"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h2 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-6">
                Deposit Interest Rates
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-khaki/10">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Deposit Type
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Interest Rate
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-Garamond font-semibold text-lightBlack dark:text-white">
                        Minimum Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Savings Account
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        6.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        NPR 1,000
                      </td>
                    </tr>
                    <tr className="bg-gray/5">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Fixed Deposit (1 Year)
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        8.50%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        NPR 10,000
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Fixed Deposit (2 Years)
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        9.00%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        NPR 10,000
                      </td>
                    </tr>
                    <tr className="bg-gray/5">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        Recurring Deposit
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-khaki font-semibold">
                        7.50%
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray dark:text-lightGray font-Lora">
                        NPR 500/month
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Important Notes */}
            <div
              className="bg-white dark:bg-normalBlack p-6 lg:p-8 rounded-lg mb-8"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h2 className="text-2xl font-Garamond font-semibold text-lightBlack dark:text-white mb-6">
                Important Notes
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora">
                    Interest rates are subject to change based on Nepal Rastra Bank guidelines and market conditions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora">
                    Actual interest rates may vary based on loan amount, tenure, and borrower profile.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora">
                    Processing fees and other charges are as per prevailing policies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-Lora">
                    For detailed terms and conditions, please contact our nearest branch.
                  </span>
                </li>
              </ul>
            </div>

            {/* Back to reports */}
            <div className="text-center">
              <Link 
                to="/reports"
                className="inline-flex items-center text-khaki hover:text-lightBlack dark:hover:text-white transition-all duration-300"
              >
                <HiArrowLongLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-Garamond font-semibold">Back to Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaseRatePage;
