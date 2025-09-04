import React, { useState, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { aboutService } from "../../services/strapi";
import { renderStrapiBlocks } from "../../utils/strapiHelpers";

interface AboutData {
  Mission?: any[];
  Vision?: any[];
  Goal?: any[];
  AboutUsDescription?: any[];
}

const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching About Us data from Strapi...');
        const data = await aboutService.getAboutUs();
        console.log('✅ About Us data received:', data);
        setAboutData(data || {});
      } catch (err) {
        console.error('❌ Error fetching About Us data:', err);
        setError('Failed to load About Us content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div>
        <BreadCrumb title="About Us" home="/" />
        <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-8"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BreadCrumb title="About Us" home="/" />
        <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
          <div className="Container">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                <p>{error}</p>
                <p className="text-sm mt-2">Please check your internet connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BreadCrumb title="About Us" home="/" />
      
      {/* About Us Content */}
      <div className="dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          <div className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5 Container mb-16">
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2">
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
              <img
                src="/images/inner/inner-logo.png"
                alt="about_section_logo"
                className="w-[50px] h-[50px]"
              />
              <hr className="w-[100px] h-[1px] bg-lightGray dark:bg-gray text-lightGray dark:text-gray" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mt-[10px] mb-[14px] font-Garamond font-semibold uppercase">
              ABOUT US
            </h1>
            <p className="font-Lora leading-7 lg:leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              {aboutData?.AboutUsDescription 
                ? renderStrapiBlocks(aboutData.AboutUsDescription).substring(0, 100) + "..."
                : "Discover our story, vision, and commitment to excellence in hospitality"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              {/* Vision Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                  {aboutData?.Vision 
                    ? renderStrapiBlocks(aboutData.Vision)
                    : "To be the premier destination for luxury hospitality, setting new standards in comfort, service excellence, and memorable experiences that inspire guests from around the world to return time and again."
                  }
                </p>
              </div>

              {/* Mission Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora mb-4">
                  {aboutData?.Mission 
                    ? renderStrapiBlocks(aboutData.Mission)
                    : "We are committed to providing exceptional hospitality services through personalized attention, world-class amenities, and sustainable practices that create unforgettable experiences for our guests."
                  }
                </p>
              </div>

              {/* Goal Section - if available */}
              {aboutData?.Goal && (
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                    Our Goal
                  </h2>
                  <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                    {renderStrapiBlocks(aboutData.Goal)}
                  </p>
                </div>
              )}

              {/* Full About Description - if available */}
              {aboutData?.AboutUsDescription && (
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                    About Our Organization
                  </h2>
                  <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                    {renderStrapiBlocks(aboutData.AboutUsDescription)}
                  </p>
                </div>
              )}
            </div>

            {/* Image Section */}
            <div className="lg:order-last">
              <img 
                src="/images/inner/about-thumb.png" 
                alt="About Us" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
