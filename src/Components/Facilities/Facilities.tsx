import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const Facilities: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      key: 'daily_interest',
      star: false,
    },
    {
      key: 'insurance',
      star: true,
    },
    {
      key: 'mobile_sms',
      star: true,
    },
    {
      key: 'balance_interest',
      star: false,
    },
    {
      key: 'cash_operations',
      star: false,
    },
  ];

  // Local fallback translations for facilities — used only when the global translations are missing
  const localFallbacks: Record<string, { category: { en: string; ne: string }; title: { en: string; ne: string }; description: { en: string; ne: string } }> = {
    daily_interest: {
      category: { en: 'DAILY INTEREST', ne: 'दैनिक ब्याज' },
  title: { en: 'Daily Balance Interest Calculation', ne: 'दैनिक मौज्दातमा ब्याज गणना' },
      description: { en: 'Interest calculated on your daily balance and credited monthly.', ne: 'तपाईंको दैनिक ब्यालेन्समा गणना गरिने ब्याज मासिक रूपमा क्रेडिट गरिन्छ।' },
    },
    insurance: {
      category: { en: 'INSURANCE', ne: 'बीमा' },
  title: { en: 'Free Accidental Insurance', ne: 'न्युनतम मौज्दातको 5 गुणा बराबरको निशुल्क दुर्घटना बिमा' },
  description: { en: 'Complimentary accidental insurance coverage for eligible members.', ne: 'योग्य सदस्यहरूको लागि निःशुल्क दुर्घटना बीमा कभर।' },
    },
    mobile_sms: {
      category: { en: 'MOBILE & SMS', ne: 'मोबाइल र एसएमएस' },
  title: { en: 'Free Mobile App & SMS Alert', ne: 'निशुल्क मोबाइल एप र SMS Alert' },
  description: { en: 'Mobile app and SMS alerts for transactions and updates.', ne: 'लेनदेन र अपडेटहरूका लागि मोबाइल एप र एसएमएस सूचनाहरू।' },
    },
    balance_interest: {
      category: { en: 'BALANCE INTEREST', ne: 'ब्यालेन्स ब्याज' },
  title: { en: 'Interest on Minimum Balance', ne: 'न्युनतम मौज्दातमा पनि ब्याज पाइने' },
  description: { en: 'Earn interest on your maintained minimum daily balance.', ne: 'तपाईंले राखेको न्यूनतम दैनिक ब्यालेन्समा ब्याज प्राप्त गर्नुहोस्।' },
    },
    cash_operations: {
      category: { en: 'CASH OPERATIONS', ne: 'नगद कारोबार' },
  title: { en: 'Withdraw & Deposit Anytime', ne: 'चाहेको बेला नगद झिक्न र राख्न मिल्ने' },
  description: { en: 'Convenient withdraw and deposit services across branches and partners.', ne: 'शाखाहरू र साझेदारहरूमा सजिलो निकासा र निक्षेप सेवाहरू।' },
    },
  };

  // Helper to safely get translated text: uses global t(), falls back to localFallbacks when key not found
  const getText = (keyPath: string) => {
    const raw = t(keyPath);
    // if translation is missing the library returns the key itself (e.g., 'facilities.daily_interest.title')
    if (typeof raw === 'string' && raw.includes('facilities.')) {
      const parts = keyPath.split('.'); // ['facilities','daily_interest','title']
      if (parts.length === 3) {
        const [, featureKey, field] = parts;
        const fallback = (localFallbacks as any)[featureKey];
        if (fallback && fallback[field] && fallback[field][language]) return fallback[field][language];
      }
      // final fallback: return last segment prettified
      return parts[parts.length - 1].replace(/_/g, ' ').toUpperCase();
    }
    return raw;
  };

  return (
    <div className="dark:bg-mediumBlack ">
      <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
        {/* section title and button */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 px-3 sm:px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className=" md:w-[450px] font-Garamond">
            <h5 className="text-base text-khaki leading-[26px] font-medium mb-[14px]  ">
              {t('facilities.title')}
            </h5>
            <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px]  text-lightBlack dark:text-white font-semibold ">
              {t('facilities.subtitle')}
            </h1>
          </div>
          <div className="mt-5 md:mt-0">
            <Link to="/services">
              <button className="btn-items">view more item</button>
            </Link>
          </div>
        </div>

        {/* features list - text only, bilingual via translations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => (
            <div key={f.key} className="flex items-start space-x-6 py-6 border-t border-[#eee]">
              <div className="w-16 text-khaki font-Garamond text-3xl md:text-4xl">{String(idx + 1).padStart(2, '0')}</div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase">
                  {getText(`facilities.${f.key}.category`)}
                </h4>
                <h2 className="text-2xl md:text-3xl font-semibold text-lightBlack dark:text-white">
                  {getText(`facilities.${f.key}.title`)}{f.star ? ' *' : ''}
                </h2>
                <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] mt-3">
                  {getText(`facilities.${f.key}.description`)}
                </p>
              </div>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 text-center mt-6">
            <p className="text-xs text-gray dark:text-lightGray font-Lora">*T&C Applied</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
