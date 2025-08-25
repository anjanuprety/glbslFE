import React from "react";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";

const AboutUs: React.FC = () => {
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
              Discover our story, vision, and commitment to excellence in hospitality
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
                  To be the premier destination for luxury hospitality, setting new standards in comfort, 
                  service excellence, and memorable experiences that inspire guests from around the world 
                  to return time and again.
                </p>
              </div>

              {/* Mission Section */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora mb-4">
                  We are committed to providing exceptional hospitality services through personalized attention, 
                  world-class amenities, and sustainable practices that create unforgettable experiences for our guests.
                </p>
                <p className="text-base sm:text-lg leading-7 lg:leading-8 text-lightGray dark:text-lightGray font-Lora">
                  Our dedicated team strives to exceed expectations while fostering meaningful connections and 
                  contributing positively to our local community.
                </p>
              </div>

              {/* Core Values */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-Garamond font-semibold text-lightBlack dark:text-white mb-4">
                  Our Core Values
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">Excellence</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Delivering superior quality in every aspect of our service
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">Hospitality</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Creating warm, welcoming experiences that feel like home
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">Sustainability</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Protecting our environment for future generations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-khaki rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-Garamond font-semibold text-lightBlack dark:text-white">Innovation</h3>
                      <p className="text-base leading-6 text-lightGray dark:text-lightGray font-Lora">
                        Continuously evolving to meet changing guest expectations
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
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
