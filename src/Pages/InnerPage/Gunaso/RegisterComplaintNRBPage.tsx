import React, { useEffect } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";

const RegisterComplaintNRBPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Redirect to NRB website after component mounts
    const timer = setTimeout(() => {
      window.open('https://gunaso.nrb.org.np/', '_blank');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirectNow = () => {
    window.open('https://gunaso.nrb.org.np/', '_blank');
  };

  return (
    <div>
      <BreadCrumb title={t('gunaso.register_complaint_nrb')} />

      {/* NRB Redirect Page */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center justify-center">
            <div
              className="max-w-2xl text-center"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="mb-8">
                <img
                  src="/images/home-1/logo-1.png"
                  className="w-32 mx-auto mb-6"
                  alt="GLBSL Logo"
                />
              </div>
              
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium mb-4">
                {t('gunaso.nrb_redirect_service')}
              </p>
              
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('gunaso.register_complaint_nrb')}
              </h2>
              
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal mb-8">
                {t('gunaso.nrb_redirect_description')}
              </p>

              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  नेपाल राष्ट्र बैंकको गुनासो पोर्टलमा रिडिरेक्ट गर्दै...
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  तपाईं स्वचालित रूपमा नेपाल राष्ट्र बैंकको आधिकारिक गुनासो वेबसाइटमा पुर्जाइनेछ।
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ३ सेकेन्ड पछि... यदि स्वचालित रिडिरेक्ट काम नगरे तल दिइएको बटन थिच्नुहोस्।
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleRedirectNow}
                  className="bg-khaki text-white py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium text-lg"
                >
                  अहिले नै NRB गुनासो पोर्टलमा जानुहोस्
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    वा यो लिंकमा सिधै जानुहोस्:
                  </p>
                  <a
                    href="https://gunaso.nrb.org.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-khaki hover:underline text-sm font-medium"
                  >
                    https://gunaso.nrb.org.np/
                  </a>
                </div>
              </div>

              <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-lightBlack dark:text-white mb-4">
                  नेपाल राष्ट्र बैंक गुनासो पोर्टलको बारेमा
                </h4>
                <div className="text-left space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                    <p>नेपाल राष्ट्र बैंकबाट इजाजतपत्र प्राप्त वित्तीय सेवा प्रदायकको गुनासो दर्ता गर्न सकिन्छ</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                    <p>वित्तीय ग्राहक संरक्षण इकाईको क्षेत्राधिकारमा निष्पक्ष सुनुवाइ</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                    <p>गुनासो दर्ता नं. इमेल मार्फत प्राप्त गरी ट्र्याक गर्न सकिन्छ</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-2 mr-3"></div>
                    <p>गुनासोको अन्तिम जवाफ र निर्णय इमेलमा प्राप्त गर्ने व्यवस्था</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplaintNRBPage;
