import React from "react";

// Props interface for ServiceHeader component
interface ServiceHeaderProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

// ServiceHeader component for consistent page headers across service pages
// Reusable component that follows existing design patterns
// Compatible with Strapi CMS for future content management
const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title = "ENJOY COMPLETE & BEST QUALITY FACILITIES",
  subtitle = "FACILITIES", 
  buttonText = "view more item",
  buttonLink = "/our_team",
  className = ""
}) => {
  
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between mb-12 px-3 sm:px-5 ${className}`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Section title */}
      <div className="md:w-[450px] font-Garamond">
        <h5 className="text-base text-khaki leading-[26px] font-medium mb-[14px]">
          {subtitle}
        </h5>
        <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
          {title}
        </h1>
      </div>
      
      {/* Action button */}
      <div className="mt-5 md:mt-0">
        {buttonLink && (
          <a href={buttonLink}>
            <button className="btn-items">
              {buttonText}
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceHeader;
