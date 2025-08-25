import React from "react";
import BranchMap from "./BranchMap";

// Props interface for BranchTile component
// Similar to PersonTile but adapted for branch-specific information
export interface BranchTileProps {
  id: string;
  name: string;
  location: string;
  address: string;
  phoneNumber: string;
  manager: {
    name: string;
    position: string;
    image: string;
    phone: string;
    email?: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  className?: string;
}

// BranchTile component - displays individual branch information
// Inspired by PersonTile but specifically designed for branch data
// Features hover reveal panel with contact info and branch details
const BranchTile: React.FC<BranchTileProps> = ({
  id,
  name,
  location,
  address,
  phoneNumber,
  manager,
  coordinates,
  className = "",
}) => {
  
  // Fallback values for missing data
  const managerImage = manager.image || "/images/inner/member-1.jpg";
  const managerName = manager.name || "Branch Manager";
  const managerEmail = manager.email || "";
  
  // Create combined branch name (e.g., "Bharatpur Branch" instead of "Chitwan Branch" + "Bharatpur")
  const displayName = name.includes(location) ? name : `${location} Branch`;
  
  return (
    // Main container with member class for consistent styling with PersonTile
    // Uses same hover animation patterns but adapted for branch information
    <div className={`member group ${className}`} data-id={id}>
      
      {/* Manager image - similar to PersonTile image display */}
      <img 
        src={managerImage} 
        className="w-full object-cover" 
        alt={`${managerName} - ${displayName}`}
        onError={(e) => {
          // Fallback image if manager photo fails to load
          e.currentTarget.src = "/images/inner/member-1.jpg";
        }}
      />
      
      {/* Content container with relative positioning for hover overlay */}
      <div className="relative overflow-hidden">
        
        {/* Visible content - branch name only */}
        <div className="px-4 lg:px-[30px] pt-5 pb-8">
          {/* Combined branch name - no separate location line */}
          <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-[28px] leading-7 md:leading-8 lg:leading-10 text-lightBlack dark:text-white font-semibold font-Garamond text-center group-hover:opacity-0 transition-opacity duration-500">
            {displayName}
          </h3>
        </div>

        {/* Hover reveal panel - positioned to not show when not hovered */}
        {/* Uses bg-normalBlack (green) instead of bg-khaki (yellow) for consistency */}
        <div className="p-6 bg-normalBlack flex items-center justify-center absolute bottom-[-100%] group-hover:bottom-0 transition-all duration-500 left-0 right-0 h-full">
          
          {/* Main content container with two sections: contact info and map */}
          <div className="grid grid-cols-5 gap-6 w-full h-full items-center">
            
            {/* Contact information section - takes 3/5 of the width for bigger fonts */}
            <div className="col-span-3 text-center lg:text-left text-white space-y-3">
              
              {/* Branch name in hover */}
              <h4 className="text-white font-semibold text-lg lg:text-xl font-Garamond leading-tight">
                {displayName}
              </h4>
              
              {/* Branch phone number */}
              <p className="text-white font-medium text-base lg:text-lg font-Lora leading-relaxed">
                📞 {phoneNumber}
              </p>
              
              {/* Branch address */}
              <p className="text-white font-medium text-sm lg:text-base font-Lora leading-relaxed">
                📍 {address}
              </p>
              
              {/* Manager email if available */}
              {managerEmail && (
                <p className="text-white font-medium text-sm lg:text-base font-Lora leading-relaxed break-all">
                  ✉️ {managerEmail}
                </p>
              )}
            </div>
            
            {/* Map section - takes 2/5 of the width, positioned to the right */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="w-full">
                <BranchMap 
                  coordinates={coordinates}
                  location={location}
                  height="140px"
                  width="100%"
                  zoom={15}
                  showMarker={true}
                  className="rounded-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                />
                {/* View larger map link */}
                <div className="text-center mt-2">
                  <button 
                    className="text-white/80 hover:text-white text-sm font-Lora underline underline-offset-2 hover:no-underline transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
                      window.open(googleMapsUrl, '_blank');
                    }}
                    aria-label={`View ${location} on larger map`}
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchTile;
