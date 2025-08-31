import React, { useState } from "react";
import BreadCrumb from "../../../BreadCrumb/BreadCrumb";
import { useLanguage } from "../../../contexts/LanguageContext";

const InterestCalculatorPage: React.FC = () => {
  const { t } = useLanguage();
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'simple' | 'compound'>('simple');
  const [interestResult, setInterestResult] = useState<{
    interest: number;
    totalAmount: number;
  } | null>(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (p && r && t) {
      let interest: number;
      let totalAmount: number;

      if (calculationType === 'simple') {
        // Simple Interest: SI = P * R * T / 100
        interest = (p * r * t);
        totalAmount = p + interest;
      } else {
        // Compound Interest: CI = P(1 + R)^T - P
        totalAmount = p * Math.pow(1 + r, t);
        interest = totalAmount - p;
      }

      setInterestResult({ interest, totalAmount });
    }
  };

  const resetCalculator = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterestResult(null);
  };

  return (
    <div>
      <BreadCrumb title={t('online.interest_calculator')} />

      {/* Interest Calculator */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px]">
          <div className="flex items-center flex-col lg:flex-row gap-10">
            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                {t('online.calculate_interest')}
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                {t('online.interest_calculator')}
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px] text-gray dark:text-lightGray font-normal">
                {t('online.interest_description')}
              </p>

              {interestResult && (
                <div className="mt-6 p-6 bg-khaki rounded-lg">
                  <h3 className="text-white text-xl font-semibold mb-4">
                    {calculationType === 'simple' ? t('online.simple_interest_result') : t('online.compound_interest_result')}
                  </h3>
                  <div className="text-white">
                    <p className="text-lg mb-2">
                      <span className="font-medium">{t('online.interest_amount')}:</span> रु {interestResult.interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">{t('online.total_amount')}:</span> रु {interestResult.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center mb-8">
                  {t('online.calculate_your_interest')}
                </h2>
                
                <div className="grid items-center grid-cols-1 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.principal_amount')} (रु) *
                    </label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="जस्तै: 100000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.interest_rate')} (% प्रति वर्ष) *
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="जस्तै: 10.5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.time_period')} (वर्षमा) *
                    </label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="जस्तै: 2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      {t('online.calculation_type')} *
                    </label>
                    <select
                      value={calculationType}
                      onChange={(e) => setCalculationType(e.target.value as 'simple' | 'compound')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent"
                    >
                      <option value="simple">{t('online.simple_interest')}</option>
                      <option value="compound">{t('online.compound_interest')}</option>
                    </select>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={calculateInterest}
                      className="flex-1 bg-khaki text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium"
                    >
                      {t('online.calculate')}
                    </button>
                    <button
                      onClick={resetCalculator}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-all duration-300 font-medium"
                    >
                      {t('online.reset')}
                    </button>
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

export default InterestCalculatorPage;
