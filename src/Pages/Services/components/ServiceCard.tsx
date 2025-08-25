import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { ServiceCardProps } from "../types";

// ServiceCard component for displaying individual service items
// Reusable component that follows existing design patterns from the project
// Compatible with Strapi CMS for future data integration
const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  category, 
  description,
  imageUrl,
  linkTo,
  orderNumber
}) => {
  
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2"
      data-aos="zoom-in-up"
      data-aos-duration="1000"
    >
      {/* Conditional layout based on odd/even order number for alternating design */}
      {parseInt(orderNumber) % 2 === 1 ? (
        // Odd numbered services - image on left, content on right
        <>
          <div className="relative w-full h-[100%] md:pr-[30px]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if service image fails to load
                e.currentTarget.src = "/images/home-1/facilities-1.png";
              }}
            />
            <div className="hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%]">
              <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki">
                {orderNumber.padStart(2, '0')}
              </h2>
            </div>
          </div>
          <div className="relative font-Garamond md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0 h-full">
            <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
              {category}
            </h4>
            <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
              <Link to={linkTo} className="hover:text-khaki transition-colors duration-300">
                {title}
              </Link>
            </h1>
            <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
              {description}
            </p>
            <Link to={linkTo}>
              <HiArrowLongRight
                size={30}
                className="text-gray hover:text-khaki transition-colors duration-300"
              />
            </Link>
          </div>
        </>
      ) : (
        // Even numbered services - content on left, image on right
        <>
          <div className="font-Garamond md:mr-[2px] lg:mr-[110px] h-full">
            <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase">
              {category}
            </h4>
            <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
              <Link to={linkTo} className="hover:text-khaki transition-colors duration-300">
                {title}
              </Link>
            </h1>
            <p className="font-Lora relative text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
              {description}
            </p>
            <Link to={linkTo}>
              <HiArrowLongRight
                className="text-gray hover:text-khaki transition-colors duration-300"
                size={30}
              />
            </Link>
          </div>
          <div className="w-full h-[100%] md:pl-[30px] relative mt-5 md:mt-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if service image fails to load  
                e.currentTarget.src = "/images/home-1/facilities-thumb-2.jpg";
              }}
            />
            <div className="hidden md:block absolute -top-[0px] -left-[12%]">
              <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki">
                {orderNumber.padStart(2, '0')}
              </h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCard;
