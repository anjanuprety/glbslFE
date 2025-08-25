import React from "react";
import { WelfareService } from "../../../types";

// Props interface for WelfareServicesList component
interface WelfareServicesListProps {
  welfareServices: WelfareService[];
  className?: string;
}

// WelfareServicesList component for displaying welfare services in a clean list format
// Compatible with Strapi CMS for future data integration
// Follows existing design patterns and responsive design principles
const WelfareServicesList: React.FC<WelfareServicesListProps> = ({ 
  welfareServices, 
  className = "" 
}) => {
  
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 gap-6">
        {welfareServices.map((service, index) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-khaki hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={index * 100}
          >
            <div className="flex items-start space-x-4">
              {/* Service number */}
              <div className="flex-shrink-0">
                <div className="bg-khaki text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                  {service.order || index + 1}
                </div>
              </div>
              
              {/* Service content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-lightBlack dark:text-white mb-2 font-Garamond">
                  {service.serviceName}
                </h3>
                <p className="text-sm text-gray dark:text-lightGray font-Lora leading-[24px]">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state when no data */}
      {welfareServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No welfare services information available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default WelfareServicesList;
