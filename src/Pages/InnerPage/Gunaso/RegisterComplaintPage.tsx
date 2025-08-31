import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getBranches } from "../../Branches/data/index";

const RegisterComplaintPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    branchOffice: '',
    complaint: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);

  // Fetch branches on component mount
  useEffect(() => {
    const branchData = getBranches();
    const branchNames = branchData.map(branch => branch.name);
    setBranches(branchNames);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        branchOffice: '',
        complaint: ''
      });
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div>
        <BreadCrumb title={t('gunaso.register_complaint')} />
        <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
          <div className="Container text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-md mx-auto">
              <strong className="font-bold">सफल!</strong>
              <span className="block sm:inline"> तपाईंको गुनासो सफलतापूर्वक दर्ता भएको छ। हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।</span>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 bg-khaki text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                नयाँ गुनासो दर्ता
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb title={t('gunaso.register_complaint')} />

      {/* Register Complaint Form */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('gunaso.complaint_service')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('gunaso.register_complaint')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal mb-6">
                {t('gunaso.complaint_description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">तुरुन्त समाधान र प्रतिक्रिया</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">गोप्यता र सुरक्षाको ग्यारेन्टी</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">२४ घण्टा भित्र सम्पर्क</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">निष्पक्ष र पारदर्शी समाधान</p>
                </div>
              </div>
            </div>

            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center mb-8">
                  गुनासो दर्ता फारम
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      गुनासो दर्ता गर्नेको पुरा नाम *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="तपाईंको पुरा नाम लेख्नुहोस्"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      मोवाइल नम्बर *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="98XXXXXXXX"
                    />
                    <p className="text-xs text-gray-300 mt-1">
                      नोट: कृपया सही फोन नम्बर प्रविष्ट गर्नुहोस् हामी तपाईंलाई फोन नम्बर मार्फत सम्पर्क गर्नेछौं।
                    </p>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      शाखा कार्यालय छान्नुहोस् । *
                    </label>
                    <select
                      name="branchOffice"
                      value={formData.branchOffice}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    >
                      <option value="">शाखा छान्नुहोस्</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      तपाईको गुनासो यहाँ लेख्नु होस । *
                    </label>
                    <textarea
                      name="complaint"
                      value={formData.complaint}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent resize-none"
                      rows={6}
                      placeholder="तपाईंको गुनासोको विस्तृत विवरण यहाँ लेख्नुहोस्"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'दर्ता गर्दै...' : 'गुनासो दर्ता गर्नुहोस् ।'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplaintPage;
