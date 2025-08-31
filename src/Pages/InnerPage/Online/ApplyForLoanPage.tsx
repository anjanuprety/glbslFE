import React, { useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";

const ApplyForLoanPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    note: '',
    branchOffice: '',
    province: '',
    district: '',
    localBody: '',
    wardNumber: '',
    loanAmount: '',
    specialNote: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const branches = [
    'धनकुटा शाखा कार्यालय',
    'काठमाडौं शाखा कार्यालय',
    'पोखरा शाखा कार्यालय',
    'बुटवल शाखा कार्यालय',
    'वीरगञ्ज शाखा कार्यालय'
  ];

  const provinces = [
    'प्रदेश नं. १',
    'मधेस प्रदेश',
    'बागमती प्रदेश',
    'गण्डकी प्रदेश',
    'लुम्बिनी प्रदेश',
    'कर्णाली प्रदेश',
    'सुदूरपश्चिम प्रदेश'
  ];

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
        email: '',
        mobileNumber: '',
        note: '',
        branchOffice: '',
        province: '',
        district: '',
        localBody: '',
        wardNumber: '',
        loanAmount: '',
        specialNote: ''
      });
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div>
        <BreadCrumb title={t('online.apply_for_loan')} />
        <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
          <div className="Container text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-md mx-auto">
              <strong className="font-bold">सफल!</strong>
              <span className="block sm:inline"> तपाईंको ऋण आवेदन सफलतापूर्वक पेश गरिएको छ। हामी छिट्टै तपाईंलाई सम्पर्क गर्नेछौं।</span>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 bg-khaki text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                नयाँ आवेदन
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb title={t('online.apply_for_loan')} />

      {/* Apply for Loan Form */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('online.loan_application')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('online.apply_for_loan')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal mb-6">
                {t('online.loan_application_description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">कम ब्याज दरमा ऋण सुविधा</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">छिटो प्रक्रिया र अनुमोदन</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">न्यूनतम कागजी कारबाही</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray dark:text-lightGray">लचकदार फिर्ता गर्ने विकल्प</p>
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
                  ऋण आवेदन फारम
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      पुरा नाम *
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
                      इमेल ठेगाना *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="example@email.com"
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
                      नोट
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent resize-none"
                      rows={2}
                      placeholder="छोटो नोट (अधिकतम १० अक्षर)"
                    />
                    <p className="text-xs text-gray-300 mt-1">{formData.note.length} of 10 max characters.</p>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      पायक पर्ने शाखा कार्यालय छान्नुहोस् । *
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
                      प्रदेश *
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    >
                      <option value="">प्रदेश छान्नुहोस्</option>
                      {provinces.map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      जिल्ला *
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="जिल्लाको नाम"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      हालको स्थानीय तहको नाम *
                    </label>
                    <input
                      type="text"
                      name="localBody"
                      value={formData.localBody}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="नगरपालिका/गाउँपालिकाको नाम"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      वडा नं. *
                    </label>
                    <input
                      type="number"
                      name="wardNumber"
                      value={formData.wardNumber}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="35"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="वडा नम्बर"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      कर्जा रकम रु *
                    </label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                      placeholder="जस्तै: 500000"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      अन्य विशेष केहि भन्नु पर्ने भए यहाँ लेख्नु होस । *
                    </label>
                    <textarea
                      name="specialNote"
                      value={formData.specialNote}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent resize-none"
                      rows={4}
                      placeholder="तपाईंको विशेष आवश्यकता वा टिप्पणी लेख्नुहोस्"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'पेश गर्दै...' : 'आवेदन पेश गर्नुहोस्'}
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

export default ApplyForLoanPage;
